"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from backend.provider_api import views as provider_views
from .views import csrf, RegisterView

urlpatterns = [ # add root directory (i.e. homepage)
    #root url (set as provider sign up for now for testing)

    path("api/csrf/", csrf, name="api-csrf"), # for getting CSRF token
    path("api/user/register/", RegisterView.as_view(), name="api-register"),
    path ('', provider_views.register, name='register'), # set root to provider registration for now for testing

    # dj admin is backend-only tool, no need for frontend
    path("admin/", admin.site.urls), # admin site (for managing database models, users, etc.)
       
    # ONLY use for traditional server-rendered web pages (in other words probably won't need)
    path("accounts/", include("allauth.urls")), # FOR USERS INTERACTING WITH DJ BUILT IN WEB FORMS: web based auth and account management--all routes from django allauth (registration, login, passwords, etc.)

    # APIs
    path("api/user/", include("backend.user_api.urls")), # consumer app
    #path("api/provider/", include("backend.provider_api.urls")), # provider app
    path("api/payments/", include("backend.payments.urls")), # payments app


]

