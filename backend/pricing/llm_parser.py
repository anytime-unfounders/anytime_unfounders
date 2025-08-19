from typing import Literal, Optional, List
from pydantic import BaseModel, Field
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain_openai import ChatOpenAI
from django.conf import settings

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
