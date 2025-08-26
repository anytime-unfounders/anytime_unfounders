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
        fields = ['user_first_name', 'user_last_name', 'user_email', 'user_phone', 'user_address_line_1', 'user_address_line_2', 'user_city', 'user_postal_code', 'user_province_state', 'user_country', 'user_password', 'user_password_confirm']

class ProviderPasswordCreationForm(forms.Form):
    provider_new_password = forms.CharField(label='Password', max_length=128, widget=forms.PasswordInput)
    provider_confirm_password = forms.CharField(label='Re-Enter Password', max_length=128, widget=forms.PasswordInput)

    def clean(self): # built-in for checking relationship between fields (check if passwords match)
        cleaned_data = super().clean()
        password = cleaned_data.get("user_password")
        password_confirm = cleaned_data.get("user_password_confirm")
        if password and password_confirm and password != password_confirm:
            self.add_error("user_password_confirm", "Passwords do not match")
        return cleaned_data

    class Meta:
        fields = ['provider_new_password', 'provider_confirm_password']

class ProviderProfileBuilding(forms.Form):
        provider_service_category = forms.ChoiceField(label='Service Category', choices=[ # drop-down menu
            ('home_emergencies', 'Home Emergencies'), 
            ('pet_care', 'Pet Care'),
            ('catering', 'Catering'),
            ('electricians', "Electricians"),
            ('locksmiths', "Locksmiths"),
            ('photographers', "Photographers"),
            ('tutors', "Tutors"),
            ('florists', "Florists"),
        ])
        add_profile_picture = forms.ImageField(label='Add a Profile Picture')
        provider_phone_number = forms.CharField(label='Phone Number', max_length=15)
        provider_email = forms.EmailField(label='Email Address', max_length=200)
        business_name = forms.CharField(label='Service Name', max_length=200)
        provider_bio = forms.CharField(label='A 3-5 Sentence Introduction of Your Service', widget=forms.Textarea) # multi-line text box using Textarea widget
        add_cover_photo = forms.ImageField(label='Add a Cover Photo')
        add_videos = forms.FileField(label='Add Video(s)', widget=forms.ClearableFileInput(attrs={'multiple': True}), required=False) # allow multiple file uploads
        pricing_structure = forms.CharField(label='Hourly Rate (in JSON format)', widget=forms.Textarea) # subject to change, dk how it works yet
        social_media_links = forms.CharField(label='Social Media Links / Website URL (in JSON format)', widget=forms.Textarea) # also subject to change 
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
        fields = ['provider_service_category']
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
class ProfilePhotoForm(forms.Form):
    provider_profile_photo = forms.ImageField(label='Add a Profile Photo')
    profile_page = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={'placeholder': 'Link to your Profile Page (if any)'})
    )

    class Meta:
        fields = ['provider_profile_photo']

class ProviderLoginForm(forms.Form):
    provider_username = forms.CharField(label='Username', max_length=150)
    provider_password = forms.CharField(label='Password', widget=forms.PasswordInput)

    class Meta:
        fields = ['provider_username', 'provider_password']

class ProviderLogoutForm(forms.Form):
    pass

class ProviderPasswordResetForm(forms.Form):
    email = forms.EmailField(label='Email Address', max_length=200)
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
        fields = ['email']
        model = ServiceProviderProfile
        fields = ['profile_photo', 'cover_photo']