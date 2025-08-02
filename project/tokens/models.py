from django.db import models
from invoices.models import Entity
from django.conf import settings


class Token(Entity):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    token = models.CharField(max_length=16, null=False, unique=True) # 16 chars


class Session(Entity):
    session_id = models.CharField(max_length=16, null=False, unique=True)
    authentication_token = models.ForeignKey(Token, on_delete=models.CASCADE, null=False)
    csrf_token = models.CharField(max_length=50, null=False, unique=True)


