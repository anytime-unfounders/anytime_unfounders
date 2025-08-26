from django import forms

class ProviderRegistrationForm(forms.Form):
    provider_first_name = forms.CharField(label='First Name', max_length=200)
    provider_last_name = forms.CharField(label='Last Name', max_length=200)
    provider_email = forms.EmailField(label='Email Address', max_length=200)
    provider_phone = forms.CharField(label='Phone Number', max_length=15)
    provider_address_line_1 = forms.CharField(label='Address Line #1', max_length=300)
    provider_address_line_2 = forms.CharField(label='Address Line #2', max_length=300, required=False)
    provider_city = forms.CharField(label='City', max_length=100)
    provider_postal_code = forms.CharField(label='Postal Code', max_length=20)
    provider_province_state = forms.CharField(label='Province/State', max_length=100)
    provider_country = forms.CharField(label='Country', max_length=100)

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

class ServiceCategoryForm(forms.Form): # drop-down menu
    provider_service_category = forms.ChoiceField(label='Service Category', choices=[
        ('home_emergencies', 'Home Emergencies'), 
        ('pet_care', 'Pet Care'),
        ('catering', 'Catering'),
        ('electricians', "Electricians"),
        ('locksmiths', "Locksmiths"),
        ('photographers', "Photographers"),
        ('tutors', "Tutors"),
        ('florists', "Florists"),
    ])

    class Meta:
        fields = ['provider_service_category']

class ProfilePhotoForm(forms.Form):
    provider_profile_photo = forms.ImageField(label='Add a Profile Photo')

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

    class Meta:
        fields = ['email']
