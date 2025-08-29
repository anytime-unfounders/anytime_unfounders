from celery import shared_task
from django.utils import timezone
from datetime import timedelta
from .models import Booking

@shared_task
def check_ghosted_bookings(): # scheduled task
    threshold = timezone.now() - timedelta(hours=3)
    ghosted = Booking.objects.filter(status='pending', request_sent_at__lt=threshold)
    for booking in ghosted:
        booking.status = 'ghosted'
        booking.save()