from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError, PermissionDenied
from django.http import JsonResponse
import json
from invoices.utils.InputValidator import InputValidator
from django.contrib.auth.models import User
import hashlib
from tokens.models import Token
from django.contrib.auth import authenticate


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


def generate_token(user_name, password):
    user = authenticate(username=user_name, password=password)
    if user is None:
        raise PermissionDenied(f"User {user_name} and given password not found.")
    new_token = hashlib.md5(f"{user_name}{password}".encode("utf-8")).hexdigest()
    print(new_token)
    token = Token(user=user, token=new_token)
    token.save()
    return token


