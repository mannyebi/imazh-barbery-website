from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import date, datetime
import time
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.validators import RegexValidator
import locale

# Create your models here.

class User(AbstractUser):
    name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    username = models.CharField(null=False, unique=True, max_length=11, validators=[RegexValidator(r'^09\d{9}$', message="شماره تلفن باید حداقل 11 رقم بوده و با 09 شروع شود")])
    banned = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = 'username'

    def __str__(self):
        return f'{self.name} {self.last_name}'
        

    
    

class OTP(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(default=timezone.now)

    def is_expired(self):
        expiratino_time = timezone.timedelta(seconds=90)
        print(timezone.now() > self.created_at + expiratino_time)
        return timezone.now() > self.created_at + expiratino_time


levels = (
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),

)
class Profile(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE)
    bio = models.TextField(null=True, blank=True)
    avatar = models.ImageField(null=True, default="team1.png")
    level = models.CharField(max_length=1, choices=levels, default='1')
    title = models.CharField(max_length=65, default="آرایشگر")
    
    def __str__(self):
        return str(self.user)
    


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

# Signal to save the Profile instance when the User is saved
@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()

class Information(models.Model):
    addres = models.TextField()
    telegram = models.CharField(max_length=1000)
    instagram = models.CharField(max_length=1000)
    youtube = models.CharField(max_length=1000)
    phoneNumber = models.IntegerField()
    tourImage = models.ImageField(null=True, blank=True, default="photo_2023-08-19_15-44-05.jpg")
    video = models.FileField(upload_to='videos', null=True, blank=True)
    bio = models.TextField()


class Weblog(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(null=False, upload_to='uploads/')

    def __str__(self):
        return f"{self.title}"
    

TIME_CHOICES = (
    ("9:00 AM", "9:00 AM"),
    ("10:00 AM", "10:00 AM"),
    ("11:00 AM", "11:00 AM"),
    ("12:00 PM", "12:00 PM"),
    ("1:00 PM", "1:00 PM"),
    ("2:00 PM", "2:00 PM"),
    ("3:00 PM", "3:00 PM"),
    ("4:00 PM", "4:00 PM"),
    ("5:00 PM", "5:00 PM"),
    ("6:00 PM", "6:00 PM"),
    ("7:00 PM", "7:00 PM"),
    ("8:00 PM", "8:00 PM"),
    ("9:00 PM", "9:00 PM"),
    ("10:00 PM", "10:00 PM"),
    ("11:00 PM", "11:00 PM"),
    ("11:30 PM", "11:30 PM"),
    ("12:00 PM", "12:00 PM"),

)
status_choice = (
    ('free', 'free'),
    ('closed', 'closed')
)


class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    day = models.DateField(default=datetime.now)
    time = models.CharField(max_length=10, choices=TIME_CHOICES)
    time_datetime = models.TimeField()
    status = models.CharField(max_length=10, choices=status_choice, default="free")

    def __str__(self):
        return f"day: {self.day} | time: {self.time}"
    
    

    def str_to_time(self):
        original_locale = locale.getlocale()
        locale.setlocale(locale.LC_TIME, 'C') 

        appointment_time = time.strptime(self.time, '%I:%M %p')
        appointment_time_datetime = datetime(self.day.year, self.day.month, self.day.day, appointment_time.tm_hour, appointment_time.tm_min)

        locale.setlocale(locale.LC_TIME, original_locale)
        return appointment_time_datetime

    

    def time_difference(self):
        
        original_locale = locale.getlocale()
        locale.setlocale(locale.LC_TIME, 'C') 


        appointment_time = time.strptime(self.time, '%I:%M %p')
        appointment_time_datetime = datetime(self.day.year, self.day.month, self.day.day, appointment_time.tm_hour, appointment_time.tm_min)

        now = datetime.now()

        locale.setlocale(locale.LC_TIME, original_locale)
         
        time_difference = (appointment_time_datetime - now).total_seconds() / 60

        return time_difference
    
    

class deactive_days(models.Model):
    day = models.DateField()


    def __str__(self):
        return str(self.day)