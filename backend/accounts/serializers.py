from dj_rest_auth.registration.serializers import RegisterSerializer

class EmailRegisterSerializer(RegisterSerializer):
    # drop username field entirely
    username = None

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data.pop("username", None)
        return data
