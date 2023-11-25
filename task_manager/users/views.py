from django.shortcuts import render, get_object_or_404
from .models import Profile
from django.http import HttpResponse

# Create your views here.

def user(request, username=""):
    if username != "":
        pr = get_object_or_404(Profile, user__username=username)

        return render(request, "users/profile.html", context={"profile": pr})
    else:
        # return users profile
        return HttpResponse("123")
