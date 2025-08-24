from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout

from .forms import UserRegistrationForm
from .forms import UserPasswordCreationForm
from .forms import UserLoginForm
from .forms import UserLogoutForm

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