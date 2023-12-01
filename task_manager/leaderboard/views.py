from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from users.models import Profile

# Create your views here.

@login_required(login_url="login/")
def leaderboard(request):
    # profiles = Profile.objects.all().order_by("-xp_amount")

    context = {
        "xp_amount": request.user.profile.xp_amount,
        "your_username": request.user.username,
        "profiles": Profile.objects.all().order_by("-xp_amount")
    }
    return render(request, "leaderboard/leaderboard.html", context=context)
