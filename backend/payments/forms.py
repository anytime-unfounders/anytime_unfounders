from django import forms

class BankingInformationForm(forms.ModelForm): # banking info form for both user and provider
    name_on_card = forms.CharField(max_length=100)
    transit_number = forms.CharField(max_length=100)
    institution_number = forms.CharField(max_length=100)
    account_number = forms.CharField(max_length=100)

    class Meta:
        fields = ['name_on_card', 'transit_number', 'institution_number', 'account_number']