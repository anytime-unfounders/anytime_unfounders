from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
from core.payments import create_connect_account_for_provider, onboarding_link

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def start_onboarding(request):
    """
    providers hit this to begin Stripe Connect onboarding (KYC + bank)
    """
    acct_id = create_connect_account_for_provider(request.user)
    url = onboarding_link(
        acct_id,
        refresh_url=request.data.get("refresh_url"),
        return_url=request.data.get("return_url"),
    )
    return Response({"onboarding_url": url, "account_id": acct_id})
