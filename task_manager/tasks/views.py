import json
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import Task
from .forms import TaskForm
from users.models import Profile

@login_required(login_url="user/login/")
def home(request):
    form = TaskForm()

    tasks = Task.objects.filter(owns=request.user)

    context = {
        "tasks": tasks,
        "form": form,
        "xp_amount": request.user.profile.xp_amount
    }

    return render(request, "tasks/home.html", context=context)

@login_required(login_url="user/login/")
def create_delete(request):
    if request.method == "POST":
        data = json.load(request)
        title = data.get("title")
        desc = data.get("desc")
        priority = data.get("priority")

        new_task = Task(title=title, description=desc, priority=priority, owns=request.user)
        new_task.save()

        return HttpResponse(new_task.idhtml)

    if request.method == "DELETE":
        data = json.load(request)
        idhtml = data.get("idhtml")
        add_xp = data.get("add_xp")
        profile = Profile.objects.get(user=request.user)

        if type(idhtml) == str:
            Task.objects.filter(idhtml=idhtml).delete()

            if add_xp:
                profile.xp_amount += 1
                profile.save()
            
            return HttpResponse("Great String")
        elif type(idhtml) == list:
            for id in idhtml:
                Task.objects.filter(idhtml=id).delete()

            if add_xp:
                profile.xp_amount += len(idhtml)
                profile.save()

            return HttpResponse("Great List")
