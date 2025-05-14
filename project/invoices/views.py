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

# Create your views here.


def secured_endpoint(endpoint):

    @wraps(endpoint)
    def wrapper(request, *args, **kwargs):
        token = request.headers.get("Token")
        if Token.objects.filter(token=token).count() > 0:
            return endpoint(request, *args, **kwargs)
        else:
            return JsonResponse({"message": "Invalid token."}, status=401)

    return wrapper


@secured_endpoint
def index(request):
    return JsonResponse({})


@secured_endpoint
def number_row_prefix_list(request):
    return JsonResponse(serialize('python', NumberRowPrefix.objects.all()), safe=False)


@secured_endpoint
def number_row_prefix_detail(request, id):
    try:
        number_row_prefix = NumberRowPrefix.objects.get(id=id)
        data = serialize('python', [number_row_prefix])
        return JsonResponse(data[0], safe=False)
    except:
        return JsonResponse({"message": "Not found."}, status=404)


@csrf_exempt
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
            return JsonResponse({"message": f"Invalid input. Required data not provided. {e.messages}"}, status=400)
    return JsonResponse({"message": "Method not allowed."}, status=405)



