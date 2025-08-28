import json
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from .forms import UserRegistrationForm, UserPasswordCreationForm, UserLoginForm, UserLogoutForm, ProviderCategoryForm
from django.views.decorators.csrf import csrf_exempt
from .models import UserLocation
from provider_api.models import ServiceProviderProfile

def register(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = UserRegistrationForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data (variables can now be used-- save to database, send email, etc.)
            user_first_name = form.cleaned_data['user_first_name']
            user_last_name = form.cleaned_data['user_last_name']
            user_email = form.cleaned_data['user_email']
            user_phone = form.cleaned_data['user_phone']
            user_address_line_1 = form.cleaned_data['user_address_line_1']
            user_address_line_2 = form.cleaned_data['user_address_line_2']
            user_city = form.cleaned_data['user_city']
            user_postal_code = form.cleaned_data['user_postal_code']
            user_province_state = form.cleaned_data['user_province_state']
            user_country = form.cleaned_data['user_country']
            # redirect to a page after successfully submitting form:
            return HttpResponseRedirect('/thanks/') 

    # if any other method, use UserRegistrationForm to generate form, validate, access cleaned data
    else:
        form = UserRegistrationForm()

    return render(request, 'name.html', {'form': form}) # return form available as a variable named 'form'

def password_creation(request):
    if request.method == 'POST':
        form = UserPasswordCreationForm(request.POST)
        if form.is_valid():
            user_new_password = form.cleaned_data['user_new_password']
            user_confirm_password = form.cleaned_data['user_confirm_password']
            # Process the password change (e.g., update the user's password)
            return HttpResponseRedirect('/thanks/')
    else:
        form = UserPasswordCreationForm()
    return render(request, 'name.html', {'form': form})

def login(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return HttpResponseRedirect('/thanks/')
    else:
        form = UserLoginForm()
    return render(request, 'name.html', {'form': form})    

def logout(request):
    if request.method == 'POST':
        form = UserLogoutForm(request.POST)
        if form.is_valid():
            logout(request) # validates empty logout form, calls function to log out user
            return HttpResponseRedirect('/thanks/')
    else:
        form = UserLogoutForm()
    return render(request, 'name.html', {'form': form})

@csrf_exempt
def update_user_location(request):
    if request.method == "POST" and request.user.is_authenticated:
        data = json.loads(request.body)
        lat = data.get("latitude")
        lon = data.get("longitude")

        loc, _ = UserLocation.objects.get_or_create(user=request.user)
        loc.latitude = lat
        loc.longitude = lon
        loc.save()

        return JsonResponse({"status": "ok"})
    return JsonResponse({"status": "unauthorized"}, status=401)

def nearby_providers(request):
    user_location = UserLocation.objects.filter(user=request.user).first()
    if not user_location:
        return JsonResponse([], safe=False)

    user_lat, user_lon = user_location.latitude, user_location.longitude
    radius_km = 10

    providers = ServiceProviderProfile.objects.filter(is_available=True)
    results = []

    for p in providers:
        if p.latitude and p.longitude:
            dx = (user_lat - p.latitude) * 111
            dy = (user_lon - p.longitude) * 111
            distance = (dx**2 + dy**2) ** 0.5
            if distance <= radius_km:
                results.append({
                    "id": p.id,
                    "name": p.user.get_full_name(),
                    "lat": p.latitude,
                    "lon": p.longitude,
                    "service": p.service_description,
                    "distance": round(distance, 2),
                })

    return JsonResponse(results, safe=False)
