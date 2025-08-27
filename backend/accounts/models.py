from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    ROLE_CHOICES = (("user","User"),("provider","Provider"))
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="user")
    
    # Stripe references (safe to store)
    stripe_customer_id = models.CharField(max_length=64, null=True, blank=True)
    stripe_account_id  = models.CharField(max_length=64, null=True, blank=True) # providers
    
    #phone_encrypted = TextPGPSymmetricKeyField(null=True, blank=True) <-- encrypted
    phone_encrypted = models.TextField(null=True, blank=True) 

@receiver(post_save, sender=User)
def make_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
