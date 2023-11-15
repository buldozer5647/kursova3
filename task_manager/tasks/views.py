from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
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

def create(request):
    if request.method == "POST":
        title = request.POST["title"]
        desc = request.POST["desc"]
        priority = request.POST["priority"]

        new_task = Task(title=title, description=desc, priority=priority)
        new_task.save()

        return HttpResponse(new_task.idhtml)
    
def delete(request):
    if request.method == "POST":
        idhtml = request.POST.getlist("idhtml")

        for id in idhtml:
            Task.objects.filter(idhtml=id).delete()

        return HttpResponse("Great")
