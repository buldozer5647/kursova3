import json

from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_protect
from .models import Task
from .forms import TaskForm

def home(request):
    form = TaskForm()

    tasks = Task.objects.all()

    context = {
        "tasks": tasks,
        "form": form,
    }

    return render(request, "tasks/home.html", context=context)

def create_delete(request):
    if request.method == "POST":
        data = json.load(request)
        title = data.get("title")
        desc = data.get("desc")
        priority = data.get("priority")

        new_task = Task(title=title, description=desc, priority=priority)
        new_task.save()

        return HttpResponse(new_task.idhtml)

    if request.method == "DELETE":
        data = json.load(request)
        idhtml = data.get("idhtml")

        if type(idhtml) == str:
            Task.objects.filter(idhtml=idhtml).delete()
            
            return HttpResponse("Great String")
        elif type(idhtml) == list:
            for id in idhtml:
                Task.objects.filter(idhtml=id).delete()

            return HttpResponse("Great List")
