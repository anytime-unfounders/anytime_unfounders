import requests
from bs4 import BeautifulSoup
import scrapy
import json
import pandas as pd
from sqlalchemy import create_engine
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_community.vectorstores import FAISS
import xgboost as xgb
from sklearn.model_selection import train_test_split
from typing import Literal, Optional, List
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain_openai import ChatOpenAI
from django.conf import settings


class ServicePriceScraper:
    def scrape_service_marketplaces(self):
        # Target sites: Thumbtack, Angi, TaskRabbit, Yelp, etc.
        pass
    
    def scrape_freelance_platforms(self):
        # Target: Upwork, Fiverr, etc.
        pass
    
    def call_apis(self):
        # APIs for local service data
        pass



#storage

class DataStorage:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
    
    def store_data(self, data, table_name):
        df = pd.DataFrame(data)
        df.to_sql(table_name, con=self.engine, if_exists='append', index=False)
    
    def fetch_data(self, query):
        with self.engine.connect() as connection:
            return pd.read_sql(query, connection)


#processing

class DataProcessor:
    def __init__(self):
        self.preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), ['duration', 'urgency']),
                ('cat', OneHotEncoder(), ['service_type', 'location'])
            ])
    
    def clean_data(self, df):
        # Handle missing values, outliers, etc.
        pass
    
    def prepare_features(self, df):
        return self.preprocessor.fit_transform(df)
    
#langchain orchestration


class PricingAssistant:
    def __init__(self, nlp_processor, pricing_model):
        self.nlp = nlp_processor
        self.model = pricing_model
        self.vector_db = FAISS.load_local("service_pricing_index", self.nlp.embeddings)
        
        self.prompt_template = """Based on these similar service examples:
        {context}
        
        And the current details:
        Service Type: {service_type}
        Location: {location}
        Duration: {duration}
        Urgency: {urgency}
        
        Provide a price estimate with explanation."""
        
        self.prompt = PromptTemplate(
            template=self.prompt_template,
            input_variables=["context", "service_type", "location", "duration", "urgency"]
        )
    
    def get_price_estimate(self, query):
        # Get similar cases
        docs = self.vector_db.similarity_search(query, k=5)
        context = "\n".join([d.page_content for d in docs])
        
        # Extract features for model prediction
        features = self.extract_features(query)
        price_prediction = self.model.predict(features)
        
        # Generate response
        response = self.prompt.format(
            context=context,
            service_type=features['service_type'],
            location=features['location'],
            duration=features['duration'],
            urgency=features['urgency']
        )
        
        return {
            "price_prediction": price_prediction,
            "similar_cases": docs,
            "explanation": response
        }
    



class PricingModel:
    def __init__(self):
        self.model = xgb.XGBRegressor(
            objective='reg:squarederror',
            n_estimators=1000,
            learning_rate=0.01
        )
    
    def train(self, X, y):
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
        self.model.fit(X_train, y_train, 
                      eval_set=[(X_test, y_test)],
                      early_stopping_rounds=50,
                      verbose=True)
    
    def predict(self, X):
        return self.model.predict(X)


#models

import uuid
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

class PriceQuote(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    query_text = models.TextField()
    parsed = models.JSONField()
    requested_currency = models.CharField(max_length=3, default="CAD")
    fx_rate_used = models.FloatField(default=1.0)
    model_version = models.CharField(max_length=50)
    median = models.FloatField(); low = models.FloatField(); high = models.FloatField()

class ProviderPricingStats(models.Model):
    provider_id = models.CharField(max_length=64, db_index=True)
    service_category = models.CharField(max_length=32)
    city = models.CharField(max_length=128, null=True, blank=True)
    n_jobs_90d = models.IntegerField(default=0)
    median_usd = models.FloatField(null=True, blank=True)
    multiplier_vs_city = models.FloatField(default=1.0)
    min_price = models.FloatField(null=True, blank=True)
    max_price = models.FloatField(null=True, blank=True)
    class Meta:
        indexes = [models.Index(fields=["provider_id","service_category","city"])]

class BookingOffer(models.Model):
    class Status(models.TextChoices):
        PENDING="pending", "pending"
        ACCEPTED="accepted","accepted"
        DECLINED="declined","declined"
        EXPIRED="expired","expired"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quote = models.ForeignKey(PriceQuote, on_delete=models.CASCADE, related_name="offers")
    provider_id = models.CharField(max_length=64, db_index=True)
    offered_price = models.FloatField()
    currency = models.CharField(max_length=3, default="CAD")
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)
    sent_at = models.DateTimeField(auto_now_add=True)
    responded_at = models.DateTimeField(null=True, blank=True)
    reason = models.CharField(max_length=64, null=True, blank=True) # "busy", "too far", etc.



#llm prser



ServiceCategory = Literal["tutoring","makeup","hair","photography","cleaning","other"]
Unit = Literal["per_hour","per_session","per_event"]

class ServiceRequest(BaseModel):
    text: str = Field(description="original user query")
    service_category: ServiceCategory
    city: Optional[str] = None
    region: Optional[str] = None
    country: Optional[str] = "Canada"
    date: Optional[str] = None
    duration_hours: Optional[float] = None
    unit: Unit
    headcount: Optional[int] = None
    quality_tier: Optional[Literal["basic","standard","premium"]] = None
    rush: Optional[bool] = None
    budget: Optional[float] = None
    currency: Optional[Literal["USD","CAD"]] = None
    extras: Optional[List[str]] = None

SYSTEM = """Convert a local-service request into normalized JSON.
- Pick the closest service_category.
- Infer unit (per_hour/per_session/per_event) from wording.
- Keep numbers numeric; use null if unknown. Avoid invented details."""
parser = PydanticOutputParser(pydantic_object=ServiceRequest)
prompt = ChatPromptTemplate.from_messages(
    [("system", SYSTEM),
     ("user", "User query:\n{query}\n\nReturn ONLY valid JSON.\n{format_instructions}")]
).partial(format_instructions=parser.get_format_instructions())

LLM = ChatOpenAI(model=getattr(settings, "OPENAI_MODEL", "gpt-4o-mini"), temperature=0)
def parse_user_query(query: str) -> ServiceRequest:
    return (prompt | LLM | parser).invoke({"query": query})
