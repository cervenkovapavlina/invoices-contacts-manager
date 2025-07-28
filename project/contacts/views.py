import json

from django.shortcuts import render
from invoices.views import secured_endpoint
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers import serialize
from contacts.models import Contact
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from invoices.utils.InputValidator import InputValidator
from functools import wraps
from tokens.models import Token
from django.db.utils import IntegrityError
from invoices.utils.Logger import Logger


@csrf_exempt
#@secured_endpoint
def contact_list(request):
    return JsonResponse(serialize('python', Contact.objects.all()), safe=False)


@csrf_exempt
#@secured_endpoint
def contact_detail(request, id):
    try:
        contact = Contact.objects.get(id=id)
        data = serialize('python', [contact])
        return JsonResponse(data[0], safe=False)
    except:
        error_message = "Not found."
        Logger.error(__name__, error_message)
        return JsonResponse({"message": error_message}, status=404)

@csrf_exempt
#@secured_endpoint
def contact_create(request):
    if request.method == "POST":
        try:
            json_data = json.loads(request.body)
            validator = InputValidator()
            filled_data = validator.validate_input(
                json_data,
                ["name"],
                {
                    "active": True,
                    "external": True,
                    "company_id": "",
                    "tax_id": "",
                    "bank_account": "",
                    "address": "",
                    "contact_person": "",
                    "phone_number": "",
                    "email_address": ""
                }
            )
            contact = Contact(
                name=filled_data["name"],
                active=filled_data["active"],
                external=filled_data["external"],
                company_id=filled_data["company_id"],
                tax_id=filled_data["tax_id"],
                bank_account=filled_data["bank_account"],
                address=filled_data["address"],
                contact_person=filled_data["contact_person"],
                phone_number=filled_data["phone_number"],
                email_address=filled_data["email_address"],
            )
        except:
            pass
    error_message = "Method not allowed."
    Logger.error(__name__, error_message)
    return JsonResponse({"message": error_message}, status=405)


@csrf_exempt
#@secured_endpoint
def contact_update(request):
    pass

