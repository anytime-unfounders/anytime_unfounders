from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('password_creation/', views.password_creation, name='password_creation'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('provider_category/', views.ProviderCategoryForm.as_view(), name='provider_category'),
    path('book_service/', views.book_service, name='book_service'),
    # password reset tools
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path("update-user-location/", views.update_user_location, name="update_user_location"),
    path("nearby-providers/", views.nearby_providers, name="nearby_providers"),
]