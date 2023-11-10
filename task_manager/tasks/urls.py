from django.urls import path
from . import views

urlpatterns = [
    path("", views.tasks, name="tasks"),
    path("profile/<int:pk>/", views.profile, name="profile"),
]