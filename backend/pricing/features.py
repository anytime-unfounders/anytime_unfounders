import pandas as pd
from datetime import datetime
from .llm_parser import ServiceRequest

def to_features(req: ServiceRequest) -> pd.DataFrame:
    d = {
        "country": req.country or "Canada",
        "region": req.region,
        "city": req.city,
        "service_category": req.service_category,
        "unit": req.unit,
        "duration_hours": req.duration_hours,
        "headcount": req.headcount,
        "quality_tier": req.quality_tier,
        "rush": req.rush,
        "dow": None, "month": None, "year": None,
    }
    if req.date:
        dt = datetime.fromisoformat(req.date)
        d.update({"dow": dt.weekday(), "month": dt.month, "year": dt.year})
    return pd.DataFrame([d])