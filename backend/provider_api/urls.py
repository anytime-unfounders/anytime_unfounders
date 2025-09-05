#urls.py

from django.urls import path, include
from .forms import AccountInfoForm, BankingInfoForm, ServiceInfoForm, ProfilePhotosForm, ProviderRegistrationForm
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('password_creation/', views.password_creation, name='password_creation'),
    #path('service_category/', views.service_category, name='service_category'),
    path('provider_profile/', views.provider_profile, name='provider_profile'),
    path('provider/', include('django.contrib.auth.urls')),
    path('register/', views.register, name='register'),
    path('accounts/', include('django.contrib.auth.urls')),
    # password reset tools
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]