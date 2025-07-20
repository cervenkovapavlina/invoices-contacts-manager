from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from invoices.utils.InputValidator import InputValidator
from tokens.utils.generators import generate_token
from invoices.utils.Logger import Logger
from django.middleware.csrf import get_token


@csrf_exempt
def token_create(request):
    if request.method == "POST":
        try:
            json_data = json.loads(request.body)
            validator = InputValidator()
            filled_data = validator.validate_input(json_data, ["user_name", "password"], {})
            token = generate_token(filled_data["user_name"], filled_data["password"])
            csrf_token = get_token(request)
            return JsonResponse({"authentication_token": token.token, "csrf_token": csrf_token})
        except Exception as e:
            error_message = f"Invalid input. Required data not provided. {e}"
            Logger.error(__name__, error_message)
            return JsonResponse({"message": error_message}, status=400)
    error_message = "Method not allowed."
    Logger.error(__name__, error_message)
    return JsonResponse({"message": error_message}, status=405)


