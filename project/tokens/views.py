from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from invoices.utils.InputValidator import InputValidator
from tokens.models import Token
from django.core.serializers import serialize
from tokens.utils.generators import generate_token


@csrf_exempt
def token_create(request):
    if request.method == "POST":
        try:
            json_data = json.loads(request.body)
            validator = InputValidator()
            filled_data = validator.validate_input(json_data, ["user_name", "password"], {})
            token = generate_token(filled_data["user_name"], filled_data["password"])
            return JsonResponse({"token": token.token})
        except Exception as e:
            return JsonResponse({"message": f"Invalid input. Required data not provided. {e}"}, status=400)
    return JsonResponse({"message": "Method not allowed."}, status=405)


