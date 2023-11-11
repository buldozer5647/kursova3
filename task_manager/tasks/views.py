from django.shortcuts import render
from django.http import HttpResponse
from .models import Task

def home(request):
    tasks = Task.objects.all()

    for task in tasks:
        task.idhtml = task.id.hex[:8]

    context = {
        "tasks": tasks,
    }

    return render(request, "tasks/home.html", context=context)
