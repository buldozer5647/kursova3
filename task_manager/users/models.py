from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True, default="No bio")
    profile_image = models.ImageField(null=True, blank=True, 
                                      default="profiles/default_pfp.png",
                                      upload_to="profiles/")
    xp_amount = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username
