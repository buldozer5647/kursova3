from django.urls import path
from . import views

urlpatterns = [
    path("", views.user, name="profile"),
    path("login/", views.loginUser, name="loginPage"),
    path("logout/", views.logoutUser, name="logoutPage"),
    path("register/", views.registerUser, name="registerPage"),
    path('update_profile/', views.update_profile, name='updateProfile'),
]