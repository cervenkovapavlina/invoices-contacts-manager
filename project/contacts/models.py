from django.db import models
from invoices.models import Entity
from django.core.validators import MinLengthValidator
from django.core.exceptions import ValidationError


class Contact(Entity):
    name = models.CharField(max_length=100, unique=True, null=False, blank=False)
    active = models.BooleanField(default=True)
    external = models.BooleanField(default=True)
    company_id = models.CharField(max_length=30, unique=False, null=True, default="")
    tax_id = models.CharField(max_length=30, unique=False, null=True, default="")
    bank_account = models.CharField(max_length=30, unique=False, null=True, default="")
    address = models.CharField(max_length=100, unique=False, null=True, default="")
    contact_person = models.CharField(max_length=100, unique=False, null=True, default="")
    phone_number = models.CharField(max_length=30, unique=False, null=True, default="")
    email_address = models.CharField(max_length=30, unique=False, null=True, default="")

    def save(self, *args, **kwargs):
        try:
            MinLengthValidator(3)(self.name)
        except ValidationError as e:
            raise ValidationError({self.name: e.messages + [f"name: {self.name}"]})
        super(Contact, self).save(*args, **kwargs)




