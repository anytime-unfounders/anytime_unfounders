from django.http import HttpResponseRedirect
from django.shortcuts import render

from .forms import NameForm

def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = NameForm(request.POST)
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

    # if any other method, use NameForm to generate form, validate, access cleaned data
    else:
        form = NameForm()

    return render(request, 'name.html', {'form': form}) # return form available as a variable named 'form'