from django.shortcuts import render, get_object_or_404, redirect
from .models import Profile
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.contrib.auth.models import User

# Create your views here.

@login_required(login_url="login/")
def user(request, username=""):
    if username != "":
        pr = get_object_or_404(Profile, user__username=username)

        return render(request, "users/profile.html", context={"profile": pr, "xp_amount": request.user.profile.xp_amount})
    else:
        pr = get_object_or_404(Profile, user__username=request.user.username)

        return render(request, "users/profile.html", context={"profile": pr, "xp_amount": request.user.profile.xp_amount})
    
def loginUser(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        try:
            user = User.objects.get(username=username)
        except:
            print("Username does not exist")
        
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            return redirect('home')
        else:
            print("Username or password is incorrect")

    return render(request, "users/log_in.html")

def registerUser(request):
    return render(request, "users/register.html")
