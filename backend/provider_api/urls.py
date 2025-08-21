from django.urls import path
from .views import start_onboarding

urlpatterns = [ path("onboarding/start/", start_onboarding) ]
