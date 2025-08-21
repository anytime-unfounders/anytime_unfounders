from __future__ import annotations
import stripe
from django.conf import settings
from accounts.models import Profile

# STRIPE_SECRET_KEY is in .env / settings
stripe.api_key = settings.STRIPE_SECRET_KEY

def get_or_create_customer(user):
    prof, _ = Profile.objects.get_or_create(user=user)
    if prof.stripe_customer_id:
        return prof.stripe_customer_id
    customer = stripe.Customer.create(email=user.email, metadata={"user_id": user.id})
    prof.stripe_customer_id = customer.id
    prof.save(update_fields=["stripe_customer_id"])
    return customer.id

def create_payment_intent(user, amount_cents: int, currency: str = "cad"):
    customer_id = get_or_create_customer(user)
    return stripe.PaymentIntent.create(
        amount=int(amount_cents),
        currency=currency.lower(),
        customer=customer_id,
        automatic_payment_methods={"enabled": True},
    )

def create_setup_intent(user):
    cid = get_or_create_customer(user)
    return stripe.SetupIntent.create(customer=cid)

def create_connect_account_for_provider(user):
    prof, _ = Profile.objects.get_or_create(user=user)
    if prof.stripe_account_id:
        return prof.stripe_account_id
    acct = stripe.Account.create(
        type="express",
        email=user.email,
        business_type="individual",
        capabilities={
            "card_payments": {"requested": True},
            "transfers": {"requested": True},
        },
        metadata={"user_id": user.id},
    )
    prof.stripe_account_id = acct.id
    prof.save(update_fields=["stripe_account_id"])
    return acct.id

def onboarding_link(acct_id: str, refresh_url: str, return_url: str) -> str:
    link = stripe.AccountLink.create(
        account=acct_id,
        refresh_url=refresh_url,
        return_url=return_url,
        type="account_onboarding",
    )
    return link.url
