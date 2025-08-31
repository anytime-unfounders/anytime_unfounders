# Create your views here.
# views.py
from formtools.wizard.views import SessionWizardView
from django.shortcuts import redirect
from django.urls import reverse
from .forms import AccountInfoForm, BankingInfoForm, ServiceInfoForm, ProfilePhotosForm, ProviderProfileBuilding, ProviderRegistrationForm, ProviderPasswordCreationForm, ProviderLoginForm, ProviderLogoutForm
from .models import User, ServiceProviderProfile
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import UserLocation
from django.db.models import F
from django.contrib.auth import authenticate, login, logout
from math import radians, sin, cos, sqrt, atan2
from django.utils import timezone
from datetime import timedelta

from .forms import ProviderBookingResponseForm

FORMS = [
    ("account_info", AccountInfoForm),
    ("banking_info", BankingInfoForm),
    ("service_info", ServiceInfoForm),
    ("profile_photos", ProfilePhotosForm),
]

TEMPLATES = {
    "account_info": "registration/account_info.html",
    "banking_info": "registration/banking_info.html",
    "service_info": "registration/service_info.html",
    "profile_photos": "registration/profile_photos.html",
}

# ============================
# PROVIDER REGISTRATION
# ============================

def register(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = ProviderRegistrationForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # extract data
            provider_first_name = form.cleaned_data['provider_first_name']
            provider_last_name = form.cleaned_data['provider_last_name']
            provider_email = form.cleaned_data['provider_email']
            provider_phone = form.cleaned_data['provider_phone']
            provider_address_line_1 = form.cleaned_data['provider_address_line_1']
            provider_address_line_2 = form.cleaned_data['provider_address_line_2']
            provider_city = form.cleaned_data['provider_city']
            provider_postal_code = form.cleaned_data['provider_postal_code']
            provider_province_state = form.cleaned_data['provider_province_state']
            provider_country = form.cleaned_data['provider_country']

            # create user object
            user = User.objects.create_user(
                username=provider_first_name + provider_last_name,
                email=provider_email,
                first_name=provider_first_name,
                last_name=provider_last_name,
                password=form.cleaned_data['provider_password'],
            )

            # create service provider profile
            ServiceProviderProfile.objects.create(
                user=user,
                phone_number=provider_phone,
                address_line_1=provider_address_line_1,
                address_line_2=provider_address_line_2,
                city=provider_city,
                postal_code=provider_postal_code,
                province_state=provider_province_state,
                country=provider_country,
            )
            login(request, user)  # log the user in after registration
            # redirect to a page after successfully submitting form:
            return JsonResponse({"status": "success", "message": "Registration successful"}, status=200)

    # if any other method, use ProviderRegistrationForm to generate form, validate, access cleaned data
    else:
        form = ProviderRegistrationForm()

    return JsonResponse({'status': 'success', 'message': 'Redirecting to provider registration'}, status=200)

def password_creation(request):
    if request.method == 'POST':
        form = ProviderPasswordCreationForm(request.POST)
        if form.is_valid():
            provider_new_password = form.cleaned_data['provider_new_password']
            provider_confirm_password = form.cleaned_data['provider_confirm_password']
            if provider_new_password == provider_confirm_password: # check if passwords match
                request.user.set_password(provider_new_password)
                request.user.save()
                # Process the password change (e.g., update the user's password)
                return JsonResponse({"status": "success", "message": "Password created successfully"}, status=200)
            else:
                form.add_error('provider_confirm_password', 'Passwords do not match.')
    else:
        form = ProviderPasswordCreationForm()
    return JsonResponse({"status": "success", "message": "Redirecting to provider profile"}, status=200)


# ============================
# LOGIN/LOGOUT
# ============================

def login(request):
    if request.method == 'POST':
        form = ProviderLoginForm(request.POST)
        if form.is_valid():
            provider_username = form.cleaned_data['provider_username']
            provider_password = form.cleaned_data['provider_password']
            user = authenticate(request, username=provider_username, password=provider_password)
            if user is not None:
                login(request, user)
                return JsonResponse({'status': 'success', 'message': 'Login successful'}, status=200)
    else:
        form = ProviderLoginForm()
    return JsonResponse({'status': 'success', 'message': 'Redirecting to provider login'}, status=200)


def logout(request):
    if request.method == 'POST':
        form = ProviderLogoutForm(request.POST)
        if form.is_valid():
            logout(request) # validates empty logout form, calls function to log out user
            return JsonResponse({'status': 'success', 'message': 'Logout successful'}, status=200)
    else:
        form = ProviderLogoutForm()
    return JsonResponse({'status': 'success', 'message': 'Redirecting to provider logout'}, status=200)

# ============================
# PROVIDER PROFILE SETUP
# ============================

def provider_profile(request):
    if request.method == 'POST':
        form = ProviderProfileBuilding(request.POST, request.FILES)
        if form.is_valid():
            provider_service_category = form.cleaned_data['provider_service_category']
            # Process the service category selection
            add_profile_picture = form.cleaned_data['add_profile_picture']
            provider_phone_number = form.cleaned_data['provider_phone_number']
            provider_email = form.cleaned_data['provider_email']
            business_name = form.cleaned_data['business_name']
            provider_bio = form.cleaned_data['provider_bio']
            add_cover_photo = form.cleaned_data['add_cover_photo']
            add_videos = form.cleaned_data['add_videos']
            pricing_structure = form.cleaned_data['pricing_structure']
            social_media_links = form.cleaned_data['social_media_links']

            # create + save provider profile object
            provider_profile = ServiceProviderProfile(
                user=request.user,
                service_category=provider_service_category,
                profile_picture=add_profile_picture,
                phone_number=provider_phone_number,
                email=provider_email,
                business_name=business_name,
                bio=provider_bio,
                cover_photo=add_cover_photo,
                videos=add_videos,
                pricing_structure=pricing_structure,
                social_media_links=social_media_links
            )
            provider_profile.save()
            login(request, provider_profile.user)  # log the user in after creating the profile
        return JsonResponse({'status': 'success', 'message': 'Profile created successfully'}, status=200)
    else:
        form = ProviderProfileBuilding()
    return JsonResponse({'status': 'success', 'message': 'Redirecting to provider profile setup'}, status=200)


# ============================
# PROVIDER LOCATION STUFF
# ============================

@csrf_exempt
def update_location(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            latitude = data.get('latitude')
            longitude = data.get('longitude')
            
            loc, _ = UserLocation.objects.get_or_create(user=request.user)
            loc.latitude = latitude
            loc.longitude = longitude
            loc.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

def get_location(request):
    if request.method == 'GET':
        try:
            loc = UserLocation.objects.get(user=request.user)
            return JsonResponse({
                'status': 'success',
                'latitude': loc.latitude,
                'longitude': loc.longitude
            })
        except UserLocation.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Location not found'}, status=404)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

def haversine(lat1, lon1, lat2, lon2):  # Haversine formula to calculate distance for more precision
    R = 6371  # Earth radius in kilometers
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c


# ============================
# PROVIDER BOOKING LOGIC
# ============================

def respond_to_booking(request, booking_id): # view for provider to respond to booking request
    from user_api.models import Booking
    booking = Booking.objects.filter(id=booking_id, provider__user=request.user).first()
    if not booking:
        return JsonResponse({"error": "Booking not found or you are not authorized to respond."}, status=404)

    if request.method == "POST":
        form = ProviderBookingResponseForm(request.POST)
        if form.is_valid():
            booking.provider_responded_at = timezone.now()
            booking.status = form.cleaned_data['status']
            booking.save()
            return JsonResponse({"status": "ok"})
    else:
        form = ProviderBookingResponseForm()

    return JsonResponse({'status': 'success', 'message': 'Redirecting to respond to booking'}, status=200)

def ghosted_booking(request, booking_id):
    from user_api.models import Booking
    booking = Booking.objects.filter(id=booking_id, provider__user=request.user).first()
    if not booking: # if booking not found
        return JsonResponse({"error": "Booking not found or you are not authorized to ghost."}, status=404)
    
    if booking.provider_responded_at + timedelta(hours=3) < timezone.now(): # if provider hasn't responded in 3 hours
        booking.provider.ghosted = True # mark provider as ghosted
        booking.provider.save() # save the provider's ghosted status
        return JsonResponse({"status": "ok"})
    return JsonResponse({"status": "not_ghosted"}, status=400) # provider has already responded
