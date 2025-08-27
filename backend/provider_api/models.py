from django.db import models

# Create your models here.
# models.py
from django.db import models
from encrypted_fields import EncryptedCharField
from django.db import models
from django.contrib.auth.models import AbstractUser
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


class ServiceCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    is_service_provider = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=20)
    company_name = models.CharField(max_length=100, blank=True, null=True)

class ServiceProviderProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)
    cover_photo = models.ImageField(upload_to='cover_photos/', blank=True, null=True)
    
    # Address information
    address_line_1 = models.CharField(max_length=100)
    address_line_2 = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50)
    province_state = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=50)
    
    # Service information (linked to ServiceCategory)
    service_category = models.ForeignKey(
        ServiceCategory, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name="providers"
    )
    service_description = models.TextField(max_length=500)
    
    name_on_card = EncryptedCharField(max_length=100)
    transit_number = EncryptedCharField(max_length=20)
    institution_number = EncryptedCharField(max_length=20)
    account_number = EncryptedCharField(max_length=30)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    is_available = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.service_category.name if self.service_category else 'No Category'}"
    
class UserLocation(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
