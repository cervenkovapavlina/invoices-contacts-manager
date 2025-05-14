from django.db import models
from invoices.models import Entity
from django.conf import settings

# Create your models here.

class Token(Entity):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    token = models.CharField(max_length=16, null=False, unique=True) # 16 chars




