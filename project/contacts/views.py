from contacts.shared.views_helper import secured_endpoint
from django.http import JsonResponse
from django.core.serializers import serialize
from contacts.models import Contact
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from invoices.utils.Logger import Logger
from contacts.services.contact_service import ContactService
from django.middleware.csrf import get_token
from contacts.shared.response_factory import ResponseFactory



@secured_endpoint
def contact_list(request):
    data = serialize('python', Contact.objects.all())
    return ResponseFactory.list(data, Contact.objects.count())


@secured_endpoint
def contact_detail(request, id):
    try:
        contact = Contact.objects.get(id=id)
        data = serialize('python', [contact])
        return ResponseFactory.item(data[0])
    except:
        error_message = "Not found."
        Logger.error(__name__, error_message)
        return ResponseFactory.message(error_message, 404)


@secured_endpoint
def contact_create(request):
    if request.method != "POST":
        error_message = "Method not allowed."
        Logger.error(__name__, error_message)
        return ResponseFactory.message(error_message, 405)

    try:
        filled_data = ContactService.validate_new_contact(request.body)
        contact = ContactService.save_contact(filled_data)
        return ResponseFactory.id(contact.id)
    except ValidationError as e:
        error_message = f"Invalid input. Required data not provided. {e.messages}"
        Logger.error(__name__, error_message)
        return ResponseFactory.message(error_message, 400)
    except IntegrityError as e:
        error_message = "Save failed."
        Logger.error(__name__, f"{error_message} {e}")
        return ResponseFactory.message(error_message, 400)


@secured_endpoint
def contact_update(request, id):
    if request.method != "PATCH":
        error_message = "Method not allowed."
        Logger.error(__name__, error_message)
        return ResponseFactory.message(error_message, 405)

    try:
        contact = ContactService.update_contact(request.body, id)
        return ResponseFactory.id(contact.id)
    except Contact.DoesNotExist:
        error_message = "Contact not found."
        return ResponseFactory.message(error_message, 404)
    except ValidationError as e:
        error_message = f"Invalid input. Required data not provided. {e.messages}"
        Logger.error(__name__, error_message)
        return ResponseFactory.message(error_message, 400)
    except IntegrityError as e:
        error_message = "Save failed."
        Logger.error(__name__, f"{error_message} {e}")
        return ResponseFactory.message(error_message, 400)


# TODO remove
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({"token": token})
