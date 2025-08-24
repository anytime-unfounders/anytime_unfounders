from django.db import models
from django.conf import settings

class Provider(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=120)
    kyc_status = models.CharField(max_length=32, default="pending") # pulled from Stripe
    # nothing sensitive—banking lives in Stripe Connect
