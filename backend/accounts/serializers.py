from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

class EmailRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(required=False, allow_blank=True) # keep a username field but make it optional & blankable

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