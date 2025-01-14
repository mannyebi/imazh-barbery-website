from django.contrib.auth.forms import UserCreationForm
from .models import User


class Usercreationform(UserCreationForm):
    class Meta:
        model = User
        fields = ['name', 'lastname', 'email', 'password1', 'password2']