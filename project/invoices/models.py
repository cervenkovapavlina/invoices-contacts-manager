from django.db import models
from django.utils import timezone

# Create your models here.


class Invoice(models.Model):
    id = models.AutoField(primary_key=True)
    created = models.DateTimeField(default=timezone.now)
    variable_symbol = models.CharField(max_length=50)

