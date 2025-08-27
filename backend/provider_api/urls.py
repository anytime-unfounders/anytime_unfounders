#urls.py

from django.urls import path
from .views import RegistrationWizard
from .forms import AccountInfoForm, BankingInfoForm, ServiceInfoForm, ProfilePhotosForm

FORMS = [
    ("account_info", AccountInfoForm),
    ("banking_info", BankingInfoForm),
    ("service_info", ServiceInfoForm),
    ("profile_photos", ProfilePhotosForm),
]

urlpatterns = [
    path(
        "register/",
        RegistrationWizard.as_view(FORMS),
        name="register"
    ),

]


