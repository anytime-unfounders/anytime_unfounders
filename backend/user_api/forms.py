from django import forms

class NameForm(forms.Form):
    your_name = forms.CharField(label='Your name', max_length=200)
    your_email = forms.EmailField(label='Your email', max_length=200)
    your_phone = forms.CharField(label='Your phone number', max_length=15)