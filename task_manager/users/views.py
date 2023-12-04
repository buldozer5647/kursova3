from django.shortcuts import render, get_object_or_404, redirect
from .models import Profile
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import CustomUserCreationForm, UserUpdateForm, UserProfileUpdateForm

# Create your views here.

@login_required(login_url="user/login/")
def user(request, username=""):
    if username != "":
        pr = get_object_or_404(Profile, user__username=username)

        return render(request, "users/profile.html", context={"profile": pr, "xp_amount": request.user.profile.xp_amount})
    else:
        pr = get_object_or_404(Profile, user__username=request.user.username)

        return render(request, "users/profile.html", context={"profile": pr, "xp_amount": request.user.profile.xp_amount, "can_logout": True})
    
def logoutUser(request):
    logout(request)
    messages.success(request, "User was logged out.")
    return redirect("loginPage")

def loginUser(request):
    if request.user.is_authenticated:
        return redirect("home")

    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        # try:
        #     user = User.objects.get(username=username)
        # except:
        #     messages.error(request, "Username does not exist!")
        
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)

            return redirect('home')
        else:
            messages.error(request, "Username or password is incorrect.")

    return render(request, "users/log_in.html")

def registerUser(request):
    form = CustomUserCreationForm()

    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)

        if form.is_valid():
            user = form.save(commit=False)
            user.first_name = user.first_name.capitalize()
            user.last_name = user.last_name.capitalize()
            user.save()

            messages.success(request, "User account was created!")

            return redirect("loginPage")
        else:
            messages.error(request, "An error has occured during registration!")

    context = {"form": form}
    return render(request, "users/register.html", context=context)

@login_required(login_url="user/login/")
def update_profile(request):
    user_initial_dict = {
        "first_name": request.user.first_name,
        "last_name": request.user.last_name,
    }

    user_profile_initial_dict = {
        "bio": request.user.profile.bio,
        "profile_image": request.user.profile.profile_image
    }

    print(user_profile_initial_dict)

    if request.method == "POST":
        user_form = UserUpdateForm(request.POST, instance=request.user)
        user_profile_form = UserProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)

        if user_form.is_valid() and user_profile_form.is_valid():
            user_form.save()
            user_profile_form.save()
            messages.success(request, "Profile updated successfully!")
    
            return redirect("profile")
    else:
        user_form = UserUpdateForm(initial=user_initial_dict)
        user_profile_form = UserProfileUpdateForm(initial=user_profile_initial_dict)

    context = {
        "user_form": user_form,
        "user_profile_form": user_profile_form,
        "xp_amount": request.user.profile.xp_amount
    }

    return render(request, "users/update_profile.html", context=context)
