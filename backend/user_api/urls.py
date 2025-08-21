from django.urls import path
from .views import prepare_checkout, resume_checkout, create_setupintent

urlpatterns = [
    path("checkout/prepare/", prepare_checkout),
    path("checkout/resume/", resume_checkout),
    path("payment/setup-intent/", create_setupintent),
]
