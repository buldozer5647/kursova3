from django.shortcuts import render, get_object_or_404
from .models import Profile

# Create your views here.

def user(request):
    pr = get_object_or_404(Profile, user__username="JoeBiden")

    return render(request, "users/profile.html", context={"profile": pr})
