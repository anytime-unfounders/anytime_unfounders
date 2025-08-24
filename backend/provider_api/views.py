from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout

from .forms import ProviderRegistrationForm
from .forms import ProviderPasswordCreationForm
from .forms import ProviderLoginForm
from .forms import ProviderLogoutForm

def register(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = ProviderRegistrationForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data (variables can now be used-- save to database, send email, etc.)
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
            # redirect to a page after successfully submitting form:
            return HttpResponseRedirect('/thanks/') 

    # if any other method, use ProviderRegistrationForm to generate form, validate, access cleaned data
    else:
        form = ProviderRegistrationForm()

    return render(request, 'name.html', {'form': form}) # return form available as a variable named 'form'

def password_creation(request):
    if request.method == 'POST':
        form = ProviderPasswordCreationForm(request.POST)
        if form.is_valid():
            provider_new_password = form.cleaned_data['provider_new_password']
            provider_confirm_password = form.cleaned_data['provider_confirm_password']
            # Process the password change (e.g., update the user's password)
            return HttpResponseRedirect('/thanks/')
    else:
        form = ProviderPasswordCreationForm()
    return render(request, 'name.html', {'form': form})

def login(request):
    if request.method == 'POST':
        form = ProviderLoginForm(request.POST)
        if form.is_valid():
            provider_username = form.cleaned_data['provider_username']
            provider_password = form.cleaned_data['provider_password']
            user = authenticate(request, username=provider_username, password=provider_password)
            if user is not None:
                login(request, user)
                return HttpResponseRedirect('/thanks/')
    else:
        form = ProviderLoginForm()
    return render(request, 'name.html', {'form': form})    

def logout(request):
    if request.method == 'POST':
        form = ProviderLogoutForm(request.POST)
        if form.is_valid():
            logout(request) # validates empty logout form, calls function to log out user
            return HttpResponseRedirect('/thanks/')
    else:
        form = ProviderLogoutForm()
    return render(request, 'name.html', {'form': form})