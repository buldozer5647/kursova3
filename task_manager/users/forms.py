from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile
from django import forms

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "username", "password1", "password2"]

class UserUpdateForm(ModelForm):
    class Meta:
        model = User
        fields = ["first_name", "last_name"]

class UserProfileUpdateForm(ModelForm):
    class Meta:
        model = Profile
        fields = ["bio", "profile_image"]

