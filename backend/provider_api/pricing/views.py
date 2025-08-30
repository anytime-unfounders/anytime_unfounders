import numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from .llm_parser import parse_user_query
from .features import to_features
from .xgb_registry import load_models
from .fx import usd_to_cad
from .models import PriceQuote, ProviderPricingStats
from .serializers import QuoteRequestSerializer, QuoteResponseSerializer, QuoteForProvidersRequestSerializer

def _predict_base_usd(req_obj):
    X = to_features(req_obj)
    median_m, spread_m, ver = load_models(req_obj.service_category)
    base_usd = float(np.expm1(median_m.predict(X)[0]))
    spread_usd = float(spread_m.predict(X)[0])
    return base_usd, spread_usd, ver

class PriceQuoteView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        s = QuoteRequestSerializer(data=request.data); s.is_valid(raise_exception=True)
        want = s.validated_data.get("currency") or settings.PRICING_DEFAULT_OUTPUT_CURRENCY
        req = parse_user_query(s.validated_data["query"])
        base_usd, spread_usd, ver = _predict_base_usd(req)
        fx = usd_to_cad() if want == "CAD" else 1.0; f = lambda v: round(v*fx, 2)
        payload = {"currency": want, "median": f(base_usd),
                   "low": f(max(0.0, base_usd-spread_usd)), "high": f(base_usd+spread_usd),
                   "model_version": ver}
        pq = PriceQuote.objects.create(
            user=request.user if request.user.is_authenticated else None,
            query_text=req.text, parsed=req.model_dump(),
            requested_currency=want, fx_rate_used=fx, model_version=ver,
            median=payload["median"], low=payload["low"], high=payload["high"])
        payload["quote_id"] = pq.id
        return Response(QuoteResponseSerializer(payload).data, status=status.HTTP_200_OK)

class QuoteForProvidersView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        s = QuoteForProvidersRequestSerializer(data=request.data); s.is_valid(raise_exception=True)
        want = s.validated_data.get("currency") or settings.PRICING_DEFAULT_OUTPUT_CURRENCY
        req = parse_user_query(s.validated_data["query"]); pids = s.validated_data["provider_ids"]
        base_usd, spread_usd, ver = _predict_base_usd(req)
        fx = usd_to_cad() if want == "CAD" else 1.0; f = lambda v: round(v*fx, 2)

        stats = {st.provider_id: st for st in ProviderPricingStats.objects.filter(
            provider_id__in=pids, service_category=req.service_category, city=req.city)}

        providers = []
        for pid in pids:
            st = stats.get(pid); n = getattr(st, "n_jobs_90d", 0) or 0
            k = 10; alpha = n/(n+k); mult = getattr(st, "multiplier_vs_city", 1.0) or 1.0
            sug_usd = base_usd * (alpha*mult + (1-alpha)*1.0)
            floor = getattr(st, "min_price", None); ceil = getattr(st, "max_price", None)
            if floor: sug_usd = max(sug_usd, floor/fx)
            if ceil:  sug_usd = min(sug_usd, ceil/fx)
            providers.append({
                "provider_id": pid,
                "suggested": f(sug_usd),
                "low": f(max(0.0, sug_usd-spread_usd)),
                "high": f(sug_usd+spread_usd),
                "accept_score": 0.5 if not st else min(0.95, 0.4 + 0.1*min(n,5)),
            })

        base_payload = {"currency": want, "median": f(base_usd),
                        "low": f(max(0.0, base_usd-spread_usd)),
                        "high": f(base_usd+spread_usd), "model_version": ver}
        return Response({"base_quote": base_payload, "providers": providers}, status=status.HTTP_200_OK)