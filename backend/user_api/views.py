import json
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from .forms import UserRegistrationForm, UserPasswordCreationForm, UserLoginForm, UserLogoutForm, ProviderCategoryForm
from django.views.decorators.csrf import csrf_exempt
from .models import UserLocation
from provider_api.models import ServiceProviderProfile # import provider profile model
from django.contrib.auth.models import User
from .models import UserProfile
from .forms import InstantBookingChoiceForm
from .forms import BookingForm
from .models import Booking
from provider_api.views import haversine # ensure haversine function is defined or imported
from provider_api.forms import ProviderBookingResponseForm
from provider_api.views import respond_to_booking

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

            user = User.objects.create_user( # create user object
                username=user_first_name + user_last_name,
                email=user_email,
                first_name=user_first_name,
                last_name=user_last_name,
                password=form.cleaned_data['user_password'],
            )
            UserProfile.objects.create( # store extra info in profile model 
                user=user,
                phone_number=user_phone,
                address_line_1=user_address_line_1,
                address_line_2=user_address_line_2,
                city=user_city,
                postal_code=user_postal_code,
                province_state=user_province_state,
                country=user_country,
            )
            login(request, user)  # log the user in after registration
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

            if user_new_password == user_confirm_password:
                request.user.set_password(user_new_password)
                request.user.save()
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
    results = [] # add into results list

    for p in providers: # loop to iterate all bookings for provider, calculate distance, sort and display bookings to provider based on distance
        if p.latitude and p.longitude:
            distance = haversine(user_lat, user_lon, p.latitude, p.longitude)
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

def book_provider(request): # view for users to book a service provider
    if request.method == "POST": # check if the request method is POST
        form = InstantBookingChoiceForm(request.POST) # create form for user's instant booking choice
        instant_booking = form.cleaned_data.get('instant_booking') == 'on' # check if instant booking is enabled
        if form.is_valid(): # validate the form
            if instant_booking: # if instant booking is enabled
                booking = form.save(commit=False) # create booking instance but don't save yet
                booking.user = request.user # assign the logged-in user to the booking
                booking.status = "confirmed" # set booking status to confirmed
                booking.save() # save
                return redirect('/instant_booking_success/') # redirect to instant booking success page
            
    else:
        form = BookingForm()
    return render(request, 'book_provider.html', {'form': form})

def provider_requests(request): # connection to provider_api: view for providers to see booking requests, sorted by distance if location available
    provider = ServiceProviderProfile.objects.filter(user=request.user).first() # get provider profile for logged-in user
    bookings = Booking.objects.filter(provider__user=request.user).order_by('-service_date') # get all bookings for provider, ordered by service date
    results = [] # initialize results list
    for booking in bookings: # loop through each booking, query user location and calculate distance
        user_loc = getattr(booking.user, 'user_location', None) # get user location
        if user_loc and provider and provider.latitude and provider.longitude: # check if user and provider locations are available
            distance = haversine(user_loc.latitude, user_loc.longitude, provider.latitude, provider.longitude) # calculate distance using imported haversine function
        else:
            distance = None # else no distance
        results.append({ # append booking details to results list
            "booking_id": booking.id,
            "user_name": booking.user.get_full_name(),
            "service_date": booking.service_date,
            "status": booking.status,
            "distance": round(distance, 2) if booking.user.user_location else None,
        })
    results.sort(key=lambda x: (x['distance'] is None, x['distance'])) # sort results by distance
    return render(request, 'provider_requests.html', {'bookings': results}) # render the provider requests page with the sorted bookings