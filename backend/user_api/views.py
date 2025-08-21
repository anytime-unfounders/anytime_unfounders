import uuid, json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import PendingCheckout
from core.payments import create_payment_intent, create_setup_intent

@api_view(["POST"])
@permission_classes([AllowAny])
def prepare_checkout(request):
    """
    Called from guest or logged-in state with cart/service info.
    If not authenticated -> create temp token + stash payload -> ask client to log in.
    If authenticated -> create PaymentIntent and return client_secret.
    """
    payload = request.data  # {service_id, price_cents, currency, ...}

    if not request.user.is_authenticated:
        token = uuid.uuid4().hex[:32]
        PendingCheckout.objects.create(temp_token=token, payload=payload)
        return Response({"requires_auth": True, "resume_token": token}, status=200)

    pi = create_payment_intent(request.user, payload["price_cents"], payload.get("currency","cad"))
    return Response({"client_secret": pi.client_secret, "requires_auth": False})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def resume_checkout(request):
    """
    After login/registration, frontend posts the resume_token to continue.
    """
    token = request.data.get("resume_token")
    try:
        pc = PendingCheckout.objects.get(temp_token=token)
    except PendingCheckout.DoesNotExist:
        return Response({"error":"invalid_token"}, status=400)

    # attach the checkout to the authed user and proceed
    pc.user = request.user
    pc.save(update_fields=["user"])
    price_cents = pc.payload["price_cents"]
    pi = create_payment_intent(request.user, price_cents, pc.payload.get("currency","cad"))
    return Response({"client_secret": pi.client_secret})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_setupintent(request):
    si = create_setup_intent(request.user)
    return Response({"client_secret": si.client_secret})
