from django.db import models
from django.conf import settings
from django.contrib.auth.models import get_user_model

User = get_user_model()

#User=settings.AUTH_USER_MODEL

class UserProfile(models.Model): # create profile model to extend user information
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, blank=True)
    address_line_1 = models.CharField(max_length=255, blank=True)
    address_line_2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    province_state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, blank=True)

class UserLocation(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user_location"
    )
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

class SelectServiceCategory(models.Model):
    selected_category = models.ForeignKey(
        'provider_api.ServiceCategory',
        on_delete=models.CASCADE
    )

class Booking(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    provider = models.ForeignKey(
        'provider_api.ServiceProviderProfile',
        on_delete=models.CASCADE,
        related_name="bookings"
    )
    service_category = models.ForeignKey(SelectServiceCategory, on_delete=models.CASCADE)
    service_date = models.DateTimeField()
    scheduled_time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('completed', 'Completed'), ('canceled', 'Canceled')], default='pending')
    notes = models.TextField(blank=True, null=True)

    request_sent_at = models.DateTimeField(auto_now_add=True) # timestamp when booking request was sent, set automatically
    provider_responded_at = models.DateTimeField(null=True, blank=True) # timestamp when provider responded, can be null initially

    def __str__(self):
        return f"Booking by {self.user.username} with {self.provider.user.get_full_name()} on {self.service_date.strftime('%Y-%m-%d %H:%M')} - Status: {self.status}"