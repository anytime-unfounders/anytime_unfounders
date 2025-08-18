from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
import hashlib

def email_sha256(email: str | None) -> str | None:
    if not email: return None
    return hashlib.sha256(email.strip().lower().encode()).hexdigest()

class Profile(models.Model):
    ROLE_CHOICES = (("user","User"),("provider","Provider"))
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default="user")
    email_hash = models.CharField(max_length=64, null=True, blank=True) # tokenization service ID can be added later
    email_token = models.CharField(max_length=255, null=True, blank=True)

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, role="user", email_hash=email_sha256(instance.email))
