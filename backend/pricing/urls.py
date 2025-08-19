from django.urls import path
from .views import PriceQuoteView, QuoteForProvidersView
urlpatterns = [
    path("quote/", PriceQuoteView.as_view(), name="price-quote"),
    path("quote_for_providers/", QuoteForProvidersView.as_view(), name="price-quote-providers"),
]