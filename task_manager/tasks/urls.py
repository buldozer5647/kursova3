from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("c_d/", views.create_delete, name="delete")
]