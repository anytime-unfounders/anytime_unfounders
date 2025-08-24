from django.db import models
from django.conf import settings

class PendingCheckout(models.Model):
    """
    holds a checkout started in guest mode
    link it after the user logs in
    """
    temp_token = models.CharField(max_length=64, unique=True)
    payload = models.JSONField() # service_id, price, etc.
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
