# Create your views here.
# views.py
from formtools.wizard.views import SessionWizardView
from django.shortcuts import redirect, render
from django.urls import reverse
from .forms import AccountInfoForm, BankingInfoForm, ServiceInfoForm, ProfilePhotosForm
from .models import User, ServiceProviderProfile
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import UserLocation
from django.db.models import F

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

class RegistrationWizard(SessionWizardView):
    form_list = FORMS
    template_name = "registration/form_wizard.html"
    def get_template_names(self):
        return [TEMPLATES[self.steps.current]]
    
    def done(self, form_list, **kwargs):
        # Process all forms
        account_data = self.get_cleaned_data_for_step('account_info')
        banking_data = self.get_cleaned_data_for_step('banking_info')
        service_data = self.get_cleaned_data_for_step('service_info')
        photos_data = self.get_cleaned_data_for_step('profile_photos')
        
        # Create user
        user = User.objects.create_user(
            username=account_data['email'],
            email=account_data['email'],
            password=account_data['password1'],
            first_name=account_data['first_name'],
            last_name=account_data['last_name'],
            phone_number=account_data['phone_number'],
            company_name=account_data['company_name'],
            is_service_provider=True
        )
        
        # Create service provider profile
        profile = ServiceProviderProfile(
            user=user,
            name_on_card=banking_data['name_on_card'],
            transit_number=banking_data['transit_number'],
            institution_number=banking_data['institution_number'],
            account_number=banking_data['account_number'],
            service_category=service_data['service_category'],
            address_line_1=service_data['address_line_1'],
            address_line_2=service_data['address_line_2'],
            city=service_data['city'],
            province_state=service_data['province_state'],
            postal_code=service_data['postal_code'],
            country=service_data['country'],
            service_description=service_data['service_description'],
            profile_photo=photos_data['profile_photo'],
            cover_photo=photos_data['cover_photo']
        )
        profile.save()
        
        return redirect('registration_complete')
    
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

def nearby_providers(request):
    user_lat = float(request.GET.get("lat"))
    user_lon = float(request.GET.get("lon"))
    radius_km = 10  # e.g. search within 10km

    providers = ServiceProviderProfile.objects.filter(is_available=True)

    # Simple distance filter (Haversine formula recommended for accuracy)
    results = []
    for p in providers:
        if p.latitude and p.longitude:
            # rough distance calc
            dx = (user_lat - p.latitude) * 111  # km per lat
            dy = (user_lon - p.longitude) * 111  # km per lon (approx)
            distance = (dx**2 + dy**2) ** 0.5
            if distance <= radius_km:
                results.append({
                    "id": p.id,
                    "name": p.user.get_full_name(),
                    "lat": p.latitude,
                    "lon": p.longitude,
                    "service": p.service_description,
                })

    return JsonResponse(results, safe=False)