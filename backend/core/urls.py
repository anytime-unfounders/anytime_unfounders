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

urlpatterns = [ # add root directory (i.e. homepage)
    
    path('', include('dj_rest_auth.registration.urls')),
    
    # dj admin is backend-only tool, no need for frontend
    path("admin/", admin.site.urls), # admin site (for managing database models, users, etc.)
       
    # ONLY use for traditional server-rendered web pages (in other words probably won't need)
    path("accounts/", include("allauth.urls")), # FOR USERS INTERACTING WITH DJ BUILT IN WEB FORMS: web based auth and account management--all routes from django allauth (registration, login, passwords, etc.)

    # APIs
    path("api/user/", include("backend.user_api.urls")), # consumer app
    path("api/provider/", include("backend.provider_api.urls")), # provider app
    path("api/payments/", include("backend.payments.urls")), # payments app
    
    # FRONTEND-USE ENDPOINTS FOR AUTH (used for React, Next.js), includes API endpoints for authentication + user registration
    path("api/auth/", include("dj_rest_auth.urls")), # login, logout, password reset, user info
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')), # user registration (new users signing up)

]

