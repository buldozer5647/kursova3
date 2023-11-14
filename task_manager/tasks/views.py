from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from .models import Task
from .forms import TaskForm

def home(request):
    form = TaskForm()

    tasks = Task.objects.all()

    for task in tasks:
        task.idhtml = task.id.hex[:8]

    context = {
        "tasks": tasks,
        "form": form,
    }

    return render(request, "tasks/home.html", context=context)

def create(request):
    if request.method == "POST":
        title = request.POST["title"]
        desc = request.POST["desc"]
        priority = request.POST["priority"]

        new_task = Task(title=title, description=desc, priority=priority)
        new_task.save()

        return HttpResponse(title + "task has been added")
