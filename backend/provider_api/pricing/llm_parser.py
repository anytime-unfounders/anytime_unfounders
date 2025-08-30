# backend/pricing/llm_parser.py
from typing import Literal, Optional, List
from pydantic import BaseModel, Field
from django.conf import settings

ServiceCategory = Literal["tutoring","makeup","hair","photography","dj","catering","cleaning","other"]
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

def parse_user_query(query: str) -> ServiceRequest:
    """
    LangChain structured JSON parse using OpenAI or Cohere.
    Imports are inside the function so Django can import this module during migrations
    even if LLM deps/keys aren’t set yet.
    """
    # Fallback for empty/bootstrapping
    if not query:
        return ServiceRequest(text="", service_category="other", unit="per_event")

    # --- lazy imports here ---
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import PydanticOutputParser

    vendor = getattr(settings, "PRICING_LLM_VENDOR", "openai")
    if vendor == "cohere":
        from langchain_cohere import ChatCohere as ChatModel
        model_name = getattr(settings, "COHERE_MODEL", "command-r-plus")
    else:
        from langchain_openai import ChatOpenAI as ChatModel
        model_name = getattr(settings, "OPENAI_MODEL", "gpt-4o-mini")

    llm = ChatModel(model=model_name, temperature=0)
    parser = PydanticOutputParser(pydantic_object=ServiceRequest)

    SYSTEM = (
        "Convert a user's local-service request into normalized JSON. "
        "Pick service_category, infer unit (per_hour/per_session/per_event), "
        "use null when unknown, don't invent details."
    )
    HUMAN = """User query:
{query}

Return ONLY valid JSON for the ServiceRequest schema.
{format_instructions}
"""
    prompt = ChatPromptTemplate.from_messages(
        [("system", SYSTEM), ("user", HUMAN)]
    ).partial(format_instructions=parser.get_format_instructions())

    chain = prompt | llm | parser
    return chain.invoke({"query": query})
