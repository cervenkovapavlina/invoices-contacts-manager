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
    prefix = models.CharField(max_length=10, default="", unique=False, null=True)
    year = models.CharField(max_length=4, default=str(datetime.now().year), unique=False, null=False)

    def get_final_prefix(self):
        return f"{self.prefix}{self.year}"

    def save(self, *args, **kwargs):
        final_prefix_already_exists = NumberRowPrefix.objects.filter(prefix=self.prefix, year=self.year).count() > 0
        if final_prefix_already_exists:
            raise ValidationError("Final prefix already exists.")
        super(NumberRowPrefix, self).save(*args, **kwargs)


class NumberRowValue(Entity):
    value = models.IntegerField(unique=False, null=False)
    prefix = models.ForeignKey(NumberRowPrefix, on_delete=models.CASCADE, null=False)

    def get_final_value(self):
        return f"{self.prefix.get_final_prefix()}{self.value:04}"

    def save(self, *args, **kwargs):
        if self._state.adding:
            self.value = NumberRowValue.objects.filter(prefix=self.prefix).count() + 1
        super(NumberRowValue, self).save(*args, **kwargs)


