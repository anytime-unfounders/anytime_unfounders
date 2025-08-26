from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Provider(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    display_name = models.CharField(max_length=120)
    profile_photo = models.ImageField(default='default.jpg', upload_to='provider_photos/', blank=True, null=True)
    kyc_status = models.CharField(max_length=32, default="pending") # pulled from Stripe
    # nothing sensitive—banking lives in Stripe Connect
    business_name = models.CharField(max_length=200, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    cover_photo = models.ImageField(default='default_cover.jpg', upload_to='provider_cover_photos/', blank=True, null=True)
    videos = models.ManyToManyField('Video', blank=True)
    pricing_structure = models.JSONField(default=dict, blank=True) # JSON field for saving structured data (complex data)
    social_media_URL = models.JSONField(default=dict, blank=True) # JSON field for saving social media links
