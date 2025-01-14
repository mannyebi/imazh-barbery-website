from .views import *
from django.urls import path



urlpatterns = [
    path('', indexPage, name='indexPage'),
    path('blogs/', blogs, name='blogs'),
    path('BlogPage/<str:pk>', BlogPage, name='BlogPage'),
    path('Virtual Tour/', VirtualTour, name='VirtualTour'),
    path('booking/', Booking, name='booking'),
    path('bookingsubmit/', bookingSubmit, name='bookingSubmit'),
    path('Authcheck/', Authcheck, name='Authcheck'),
    path('verify user/', verify_signedup_user, name='verifysuser'),
    path('verify otp/', check_otp_new_user, name='check_otp'),
    path('create user/', create_new_user, name='createuser'),
    path('Imazh academy/', academy, name='academy'),

]

