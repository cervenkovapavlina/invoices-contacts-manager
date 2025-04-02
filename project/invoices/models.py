from django.db import models
from django.utils import timezone
from datetime import datetime


# Create your models here.


class Invoice(models.Model):
    id = models.AutoField(primary_key=True)
    created = models.DateTimeField(default=timezone.now)
    variable_symbol = models.CharField(max_length=50)


class Entity(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(default=timezone.now)
    deleted_at = models.DateTimeField(default=None, null=True, blank=True)

class NumberRow(Entity):
    prefix = models.CharField(max_length=20, default=str(datetime.now().year))
    order = models.IntegerField()
    def save(self, *args, **kwargs):
        if self._state.adding:
            last_instance = NumberRow.objects.order_by('-order').first()
            self.order = last_instance.order + 1 if last_instance else 1
        super(NumberRow, self).save(*args, **kwargs)


