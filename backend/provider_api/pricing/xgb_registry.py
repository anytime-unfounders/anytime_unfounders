from functools import lru_cache
from joblib import load
from pathlib import Path
from django.conf import settings
STORE = Path(settings.PRICING_MODEL_STORE)

@lru_cache
def load_models(service_category: str):
    return load(STORE/"xgb_median_usd.joblib"), load(STORE/"xgb_spread_usd.joblib"), "xgb_v1"