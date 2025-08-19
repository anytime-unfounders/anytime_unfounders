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