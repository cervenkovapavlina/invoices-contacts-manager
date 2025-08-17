from contacts.models import Contact
from django.forms.models import model_to_dict
import json
from invoices.utils.InputValidator import InputValidator


class ContactService:

    @staticmethod
    def get_contact_default_fields():
        return {
            "active": True,
            "external": True,
            "registration_number": "",
            "vat_number": "",
            "bank_account": "",
            "address": "",
            "contact_person": "",
            "phone_number": "",
            "email_address": ""
        }

    @staticmethod
    def save_contact(filled_data):
        contact = Contact(
            name=filled_data["name"],
            active=filled_data["active"],
            external=filled_data["external"],
            registration_number=filled_data["registration_number"],
            vat_number=filled_data["vat_number"],
            bank_account=filled_data["bank_account"],
            address=filled_data["address"],
            contact_person=filled_data["contact_person"],
            phone_number=filled_data["phone_number"],
            email_address=filled_data["email_address"],
        )
        contact.save()
        return contact

    @staticmethod
    def validate_new_contact(body):
        json_data = json.loads(body)
        validator = InputValidator()
        filled_data = validator.validate_input(
            json_data,
            ["name"],
            ContactService.get_contact_default_fields()
        )
        return filled_data

    @staticmethod
    def update_contact(body, id):
        contact = Contact.objects.get(id=id)
        json_data = json.loads(body)
        for field, value in json_data.items():
            setattr(contact, field, value)
        ContactService.validate_existing_contact(contact)
        contact.save()
        return contact

    @staticmethod
    def validate_existing_contact(contact):
        data = model_to_dict(contact)
        validator = InputValidator()
        validator.validate_input(data, ["name"], {})
