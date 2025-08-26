from django.contrib import admin
from .models import Provider

admin.site.register(Provider) 
# register provider model to be visible + manageable on django admin site