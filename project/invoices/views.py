from django.http import JsonResponse
from django.core.serializers import serialize
import json
from invoices.models import NumberRowPrefix, NumberRowValue
from django.core.exceptions import ValidationError
from invoices.utils.InputValidator import InputValidator
from django.db.utils import IntegrityError
from invoices.utils.Logger import Logger
from contacts.shared.views_helper import secured_endpoint, paginate_response
from contacts.shared.response_factory import ResponseFactory


@secured_endpoint
def index(request):
    return JsonResponse({})


@secured_endpoint
def number_row_prefix_list(request):
    page_number = request.GET.get('page')
    return paginate_response(NumberRowPrefix, page_number)


@secured_endpoint
def number_row_prefix_detail(request, id):
    try:
        number_row_prefix = NumberRowPrefix.objects.get(id=id)
        data = serialize('python', [number_row_prefix])
        return ResponseFactory.item(data[0])
    except:
        error_message = "Not found."
        Logger.error(__name__, error_message)
        return ResponseFactory.message(error_message, 404)


@secured_endpoint
def number_row_prefix_create(request):
    if request.method == "POST":
        try:
            json_data = json.loads(request.body)
            validator = InputValidator()
            filled_data = validator.validate_input(json_data, ["name"], {"prefix": "", "received": True})
            number_row_prefix = NumberRowPrefix(prefix=filled_data["prefix"], name=filled_data["name"],
                                                received=filled_data["received"])
            number_row_prefix.save()
            return ResponseFactory.id(number_row_prefix.id)
        except ValidationError as e:
            error_message = f"Invalid input. Required data not provided. {e.messages}"
            Logger.error(__name__, error_message)
            return ResponseFactory.message(error_message, 400)
        except IntegrityError as e:
            error_message = "Save failed."
            Logger.error(__name__, f"{error_message} {e}")
            return ResponseFactory.message(error_message, 400)
    error_message = "Method not allowed."
    Logger.error(__name__, error_message)
    return ResponseFactory.message(error_message, 405)
