from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = settings.AUTH_USER_MODEL

class Profile(models.Model):
    ROLE_CHOICES = (("user", "User"), ("provider", "Provider"))

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,  # ✅ stays as string reference for migrations
        on_delete=models.CASCADE,
        related_name="profile"
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="user")

    # Stripe references (safe to store)
    stripe_customer_id = models.CharField(max_length=64, null=True, blank=True)
    stripe_account_id = models.CharField(max_length=64, null=True, blank=True)

    phone_encrypted = models.TextField(null=True, blank=True)


    
@receiver(post_save, sender=User)   
def make_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)