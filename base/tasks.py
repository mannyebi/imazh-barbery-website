from celery import shared_task
from django.utils import timezone
from .models import Appointment, OTP
import time
import requests
from datetime import date
import datetime
from datetime import timedelta
from django.db.models import Q
import locale
import csv
from datetime import date

@shared_task
def sendsms(phonenumber, text):
    print(f'sms sent to -- {phonenumber} | text -> {text}')
    apikey = None #get your own api key.
    response = requests.get(f"") #write a propper one by your self.
    print(f'reminder sms response text :    {response.text}')



@shared_task
def reminder():
    appointments = Appointment.objects.filter(Q(day=timezone.now().date())|Q(day=timezone.now().date()+timedelta(days=1))&Q(status='closed'))
    original_locale = locale.getlocale()
    # Set the default locale temporarily
    locale.setlocale(locale.LC_TIME, 'C')
    for appointment in appointments:
        if timezone.now().date() == appointment.day:
            booked_time_strp = (time.strptime(f"{appointment.time}", "%I:%M %p"))
            booked_time_strf = datetime.datetime(timezone.now().year, timezone.now().month, appointment.day.day,booked_time_strp.tm_hour,booked_time_strp.tm_min,booked_time_strp.tm_sec)
            target_time = booked_time_strf-timedelta(minutes=30)
            time_for_send_sms = (target_time-timezone.now())
            if int(time_for_send_sms.total_seconds()) <= 55 and int(time_for_send_sms.total_seconds()) >= 0:
                print('sms sening function activated')
                text = f"{appointment.user.name} عزیز یادت نره ما نیم ساعت دیگه تو ایماژ منتظرتیم."#type:ignore
                sendsms(appointment.user.username, text)#type:ignore
            else:
                print(f'booked time : {booked_time_strf} --- total seconds to send sms : {time_for_send_sms.total_seconds()}')
    locale.setlocale(locale.LC_TIME, original_locale)



@shared_task
def handleOTP():
    expired_otps = OTP.objects.filter(created_at__lt=timezone.now() - timezone.timedelta(minutes=2))
    expired_otps.delete()



@shared_task
def check_appointment_expiration():
    appointments_to_close = Appointment.objects.filter(Q(day=datetime.datetime.now().date())&Q(status="free"))
    original_locale = locale.getlocale()
    # Set the default locale temporarily
    locale.setlocale(locale.LC_TIME, 'C')

    for appointement in appointments_to_close:
        appointement_date = (time.strptime(f"{appointement.time}", "%I:%M %p"))
        strfTime = datetime.datetime(timezone.now().year, timezone.now().month, datetime.datetime.now().date().day, appointement_date.tm_hour,
                                    appointement_date.tm_min, appointement_date.tm_sec)
        if datetime.datetime.now() > strfTime or date.today() > appointement.day :
            appointement.status = "closed"
            appointement.save()
            

    locale.setlocale(locale.LC_TIME, original_locale)
