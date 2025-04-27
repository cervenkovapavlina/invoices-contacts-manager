from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import UniqueConstraint
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

    class Meta:
        abstract = True


class NumberRowPrefix(Entity):
    prefix = models.CharField(max_length=10, default="", unique=False)
    name = models.CharField(max_length=50, null=False, unique=True)
    received = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        prefix_already_exists = NumberRowPrefix.objects.filter(prefix=self.prefix, received=self.received).count() > 0
        if prefix_already_exists:
            raise ValidationError("Prefix already exists for the selected invoice type.")
        super(NumberRowPrefix, self).save(*args, **kwargs)


class NumberRowValue(Entity):
    value = models.IntegerField(unique=False, null=False)
    prefix = models.ForeignKey(NumberRowPrefix, on_delete=models.CASCADE, null=False)
    year = models.CharField(max_length=4, default=str(datetime.now().year), unique=False, null=False)

    def get_final_value(self):
        return f"{self.prefix.prefix}{self.year}{self.value:04}"

    def save(self, *args, **kwargs):
        if self._state.adding:
            self.value = NumberRowValue.objects.filter(prefix=self.prefix, year=self.year).count() + 1
        super(NumberRowValue, self).save(*args, **kwargs)


