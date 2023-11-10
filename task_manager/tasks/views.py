from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

task_list = [ # list of dicts
    {
        "id": 1,
        "title": "Task 1"
    },
    {
        "id": 2,
        "title": "Task 2"
    },
    {
        "id": 3,
        "title": "Task 3"
    }
]
profiles_list = [ # list of dicts
    {
        "id": 1,
        "name": "Denys"
    },
    {
        "id": 2,
        "name": "Orest"
    },
    {
        "id": 3,
        "name": "Nazarius"
    }
]

def tasks(request): # http request
    page = "Tasks"
    number = 9
    context = {
        "page": page,
        "number": number,
        "tasks": task_list
    }
    return render(request, "tasks/tasks.html", context=context)

def profile(request, pk):
    profileObj = None
    for i in profiles_list:
        if i["id"] == pk:
            profileObj = i
    return render(request, "tasks/profile.html", {"profile": profileObj})
