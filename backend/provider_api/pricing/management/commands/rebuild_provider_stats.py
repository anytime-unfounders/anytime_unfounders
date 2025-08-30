from django.core.management.base import BaseCommand
from pricing.models import ProviderPricingStats
# TODO: import your real Booking/Payment models
# from servicer.models import Booking

class Command(BaseCommand):
    help = "Rebuild ProviderPricingStats from recent bookings (USD-normalized)."

    def handle(self, *args, **kw):
        # Pseudo: replace with real aggregation grouped by (provider_id, service_category, city)
        # Example fields you must compute:
        # - n_jobs_90d, median_usd
        # - multiplier_vs_city = provider_median_usd / market_median_usd_for_segment
        # - min_price / max_price from provider’s base settings (if you store them elsewhere)
        # Upsert ProviderPricingStats rows here.
        self.stdout.write(self.style.SUCCESS("ProviderPricingStats refreshed"))