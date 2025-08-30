from django.core.management.base import BaseCommand 
from django.conf import settings
from pathlib import Path
import pandas as pd, numpy as np
from sklearn.model_selection import GroupKFold, cross_val_predict
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor
from joblib import dump

# offline model training 

STORE = Path(settings.PRICING_MODEL_STORE)

class Command(BaseCommand):
    help = "Train XGBoost pricing models (median + spread) in USD."
    def handle(self, *args, **kw):
        df = pd.read_parquet("data/pricing_training.parquet")
        df["price_usd"] = df["price_local"] / df["fx_rate_used"]
        cats = ["country","region","city","service_category","unit","quality_tier","rush"]
        nums = ["duration_hours","headcount","dow","month","year"]
        y_log = np.log1p(df["price_usd"])
        groups = df.get("provider_id", pd.Series(range(len(df))))
        pre = ColumnTransformer([("cat", OneHotEncoder(handle_unknown="ignore"), cats),
                                 ("num", "passthrough", nums)])
        m = XGBRegressor(n_estimators=800, max_depth=8, learning_rate=0.05,
                         subsample=0.8, colsample_bytree=0.8, reg_lambda=1.5,
                         objective="reg:squarederror", n_jobs=-1)
        pipe_m = Pipeline([("prep", pre), ("xgb", m)])
        cv = GroupKFold(n_splits=5)
        oof = cross_val_predict(pipe_m, df[cats+nums], y_log, cv=cv, groups=groups, method="predict")
        pipe_m.fit(df[cats+nums], y_log); STORE.mkdir(parents=True, exist_ok=True)
        dump(pipe_m, STORE / "xgb_median_usd.joblib")
        resid = np.abs(np.expm1(y_log) - np.expm1(oof))
        s = XGBRegressor(n_estimators=400, max_depth=6, learning_rate=0.07,
                         subsample=0.9, colsample_bytree=0.9, reg_lambda=1.0)
        pipe_s = Pipeline([("prep", pre), ("xgb", s)])
        pipe_s.fit(df[cats+nums], resid); dump(pipe_s, STORE / "xgb_spread_usd.joblib")
        self.stdout.write(self.style.SUCCESS(f"Saved models to {STORE}"))