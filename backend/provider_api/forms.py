# forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User, ServiceProviderProfile, ServiceCategory

# forms.py
class AccountInfoForm(UserCreationForm):
    first_name = forms.CharField(
        label="Full Legal Name (First)",
        widget=forms.TextInput(attrs={'placeholder': 'First Name'})
    )
    last_name = forms.CharField(
        label="Full Legal Name (Last)",
        widget=forms.TextInput(attrs={'placeholder': 'Last Name'})
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={'placeholder': 'Email'})
    )
    company_name = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={'placeholder': 'Company Name'})
    )
    phone_number = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Phone Number'})
    )

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'company_name', 'phone_number', 'password1', 'password2']
        
# forms.py
class BankingInfoForm(forms.ModelForm):
    name_on_card = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Name on Card'})
    )
    transit_number = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Transit No.'})
    )
    institution_number = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Institution No.'})
    )
    account_number = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Account No.'})
    )

    class Meta:
        model = ServiceProviderProfile
        fields = ['name_on_card', 'transit_number', 'institution_number', 'account_number']
        
# forms.py
class ServiceInfoForm(forms.ModelForm):
    service_category = forms.ModelChoiceField(
        queryset=ServiceCategory.objects.filter(is_active=True),
        widget=forms.Select(attrs={'class': 'Select Service Category'})
    )
    address_line_1 = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Address Line #1'})
    )
    address_line_2 = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={'placeholder': 'Address Line #2'})
    )
    city = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'City'})
    )
    postal_code = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Postal Code'})
    )
    province_state = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Province/State'})
    )
    country = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': 'Country'})
    )
    service_description = forms.CharField(
        widget=forms.Textarea(attrs={
            'placeholder': '3-5 Sentences Introduction of your Service',
            'rows': 5
        })
    )

    profile_page = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={'placeholder': 'Link to your Profile Page (if any)'})
    )

    class Meta:
        model = ServiceProviderProfile
        fields = ['service_category', 'address_line_1', 'address_line_2', 'city', 
                 'postal_code', 'province_state', 'country', 'service_description']
        
# forms.py
class ProfilePhotosForm(forms.ModelForm):
    profile_photo = forms.ImageField(
        label="Add a Profile Photo",
        required=False,
        widget=forms.FileInput(attrs={'accept': 'image/*'})
    )
    cover_photo = forms.ImageField(
        label="Add Cover Photo",
        required=False,
        widget=forms.FileInput(attrs={'accept': 'image/*'})
    )

    class Meta:
        model = ServiceProviderProfile
        fields = ['profile_photo', 'cover_photo']