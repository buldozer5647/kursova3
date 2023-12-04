from django.db import models
import uuid
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=2000, null=True, blank=True)
    idhtml = models.CharField(max_length=10, editable=False, default="123")
    owns = models.ForeignKey(User, on_delete=models.CASCADE)

    L = "L"
    M = "M"
    H = "H"
    PRIORITY_CHOICES = [
        (L, "Low"),
        (M, "Medium"),
        (H, "High")
    ]

    priority = models.CharField(max_length=1, choices=PRIORITY_CHOICES, default=L)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        self.idhtml = self.id.hex[:8]
        super(Task, self).save(*args, **kwargs)
