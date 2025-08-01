import time

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from django.template import loader
import json
from invoices.models import NumberRowPrefix, NumberRowValue
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from invoices.utils.InputValidator import InputValidator
from functools import wraps
from tokens.models import Token
from django.db.utils import IntegrityError
from invoices.utils.Logger import Logger

# Create your views here.


def secured_endpoint(endpoint):

    @wraps(endpoint)
    def wrapper(request, *args, **kwargs):
        token = request.headers.get("Token")
        if Token.objects.filter(token=token).count() > 0:
            return endpoint(request, *args, **kwargs)
        else:
            error_message = "Invalid token."
            Logger.error(__name__, error_message)
            return JsonResponse({"message": error_message}, status=401)

    return wrapper


@secured_endpoint
def index(request):
    return JsonResponse({})


@secured_endpoint
@csrf_exempt # TODO: Remove when frontend communicates correctly.
def number_row_prefix_list(request):
    return JsonResponse(serialize('python', NumberRowPrefix.objects.all()), safe=False)


@secured_endpoint
def number_row_prefix_detail(request, id):
    try:
        number_row_prefix = NumberRowPrefix.objects.get(id=id)
        data = serialize('python', [number_row_prefix])
        return JsonResponse(data[0], safe=False)
    except:
        error_message = "Not found."
        Logger.error(__name__, error_message)
        return JsonResponse({"message": error_message}, status=404)


@csrf_exempt # TODO: Remove when frontend communicates correctly.
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
            return JsonResponse({"id": number_row_prefix.id})
        except ValidationError as e:
            error_message = f"Invalid input. Required data not provided. {e.messages}"
            Logger.error(__name__, error_message)
            return JsonResponse({"message": error_message}, status=400)
        except IntegrityError as e:
            error_message = "Save failed."
            Logger.error(__name__, f"{error_message} {e}")
            return JsonResponse({"message": error_message}, status=400)
    error_message = "Method not allowed."
    Logger.error(__name__, error_message)
    return JsonResponse({"message": error_message}, status=405)


