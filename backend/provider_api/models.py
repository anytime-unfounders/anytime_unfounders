from django.db import models

# Create your models here.
# models.py
from django.db import models
from django_cryptography.fields import encrypt
from django.db import models
from django.contrib.auth.models import AbstractUser




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
    
    name_on_card = encrypt(models.CharField(max_length=100))
    transit_number = encrypt(models.CharField(max_length=20))
    institution_number = encrypt(models.CharField(max_length=20))
    account_number = encrypt(models.CharField(max_length=50))
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
