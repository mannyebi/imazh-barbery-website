from django.contrib import admin
from .models import User, Profile, Information, Weblog, Appointment, OTP, deactive_days



# Register your models here.


admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Information)
admin.site.register(Weblog)
admin.site.register(Appointment)
admin.site.register(OTP)
admin.site.register(deactive_days)
