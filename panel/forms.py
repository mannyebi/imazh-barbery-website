from attr import fields
from django import forms
from base.models import Weblog, Appointment, User

class add_blog_form(forms.ModelForm):
    class Meta:
        model = Weblog
        fields = ['title', 'body', 'image']


class Appointment_form(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ['user', 'day', 'time']



class User_form(forms.ModelForm):
    class Meta:
        model = User
        fields = ["name", "last_name"]
