from django import forms
from provider_api.models import ServiceCategory
from .models import SelectServiceCategory
from .models import Booking
from provider_api.models import Provider

class UserRegistrationForm(forms.Form):
    user_first_name = forms.CharField(label='First Name', max_length=200)
    user_last_name = forms.CharField(label='Last Name', max_length=200)
    user_email = forms.EmailField(label='Email Address', max_length=200)
    user_phone = forms.CharField(label='Phone Number', max_length=15)
    user_address_line_1 = forms.CharField(label='Address Line #1', max_length=300)
    user_address_line_2 = forms.CharField(label='Address Line #2', max_length=300, required=False)
    user_city = forms.CharField(label='City', max_length=100)
    user_postal_code = forms.CharField(label='Postal Code', max_length=20)
    user_province_state = forms.CharField(label='Province/State', max_length=100)
    user_country = forms.CharField(label='Country', max_length=100)
    
    class Meta:
        fields = ['user_first_name', 'user_last_name', 'user_email', 'user_phone', 'user_address_line_1', 'user_address_line_2', 'user_city', 'user_postal_code', 'user_province_state', 'user_country', 'user_password', 'user_password_confirm']

class UserPasswordCreationForm(forms.Form):
    user_new_password = forms.CharField(label='Password', max_length=128, widget=forms.PasswordInput)
    user_confirm_password = forms.CharField(label='Re-Enter Password', max_length=128, widget=forms.PasswordInput)

    def clean(self): # built-in for checking relationship between fields (check if passwords match)
            cleaned_data = super().clean()
            password = cleaned_data.get("user_password")
            password_confirm = cleaned_data.get("user_password_confirm")
            if password and password_confirm and password != password_confirm:
                self.add_error("user_password_confirm", "Passwords do not match")
            return cleaned_data

    class Meta:
        fields = ['user_new_password', 'user_confirm_password']

class UserLoginForm(forms.Form):
    user_username = forms.CharField(label='Username', max_length=150)
    user_password = forms.CharField(label='Password', widget=forms.PasswordInput)

    class Meta:
        fields = ['user_username', 'user_password']

class UserLogoutForm(forms.Form):
    pass

class UserPasswordResetForm(forms.Form):
    email = forms.EmailField(label='Email Address', max_length=200)

    class Meta:
        fields = ['email']

class ProviderCategoryForm(forms.Form):  # custom form for selecting service category (subcategories), for filtering
    provider_service_category = forms.ModelChoiceField(
        queryset=ServiceCategory.objects.all(),
        label='Service Category',
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    latitude = forms.FloatField(label='Latitude', required=False)
    longitude = forms.FloatField(label='Longitude', required=False)

    class Meta:
        fields = ['provider_service_category', 'latitude', 'longitude']

class SelectServiceCategoryForm(forms.ModelForm): # model form for saving directly to the database (save to SelectServiceCategory in models.py)
    class Meta:
        model = SelectServiceCategory
        fields = ['selected_category']

class BookingForm(forms.ModelForm): # form for booking a service, using model form from Booking
    class Meta: # specify model and fields to include in the form
        model = Booking
        fields = ['provider', 'service_category', 'service_date', 'scheduled_time', 'notes']