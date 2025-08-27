from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

class EmailRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(required=False, allow_blank=True, allow_null=True) # keep a username field but make it optional & blankable

    def _unique_username(self, email):
        base = (email or "").split("@")[0][:20] or "user"
        User = get_user_model()
        username = base
        i = 0
        while User.objects.filter(username=username).exists():
            i += 1
            username = f"{base}{i}"
        return username
    
    def validate(self, attrs):
        if not attrs.get("username"):
            attrs["username"] = self._unique_username(attrs.get("email"))
        return super().validate(attrs)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        # synthesize a unique username if missing/blank
        if not data.get("username"):
            base = (data.get("email") or "").split("@")[0][:20] or "user"
            username = base
            User = get_user_model()
            i = 0
            while User.objects.filter(username=username).exists():
                i += 1
                username = f"{base}{i}"
            data["username"] = username
        return data