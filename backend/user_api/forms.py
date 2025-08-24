from django import forms

class NameForm(forms.Form):
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