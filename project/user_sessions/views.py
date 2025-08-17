from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from invoices.utils.InputValidator import InputValidator
from user_sessions.utils.generators import generate_token, generate_session
from invoices.utils.Logger import Logger
from django.middleware.csrf import get_token
from user_sessions.models import Session
from urllib.parse import unquote


@csrf_exempt
def session_create(request):
    if request.method == "POST":
        try:
            json_data = json.loads(request.body)
            validator = InputValidator()
            filled_data = validator.validate_input(json_data, ["user_name", "password"], {})
            authentication_token = generate_token(filled_data["user_name"], filled_data["password"])
            csrf_token_value = get_token(request)
            session = generate_session(authentication_token, csrf_token_value)
            return JsonResponse({
                "session_id": session.session_id,
                "authentication_token": authentication_token.token,
                "csrf_token": csrf_token_value,
            })
        except Exception as e:
            error_message = f"Invalid input. Required data not provided. {e}"
            Logger.error(__name__, error_message)
            return JsonResponse({"message": error_message}, status=400)
    error_message = "Method not allowed."
    Logger.error(__name__, error_message)
    return JsonResponse({"message": error_message}, status=405)


@csrf_exempt
def session_get(request, session_id):
    try:
        session = Session.objects.get(session_id=unquote(session_id))
        return JsonResponse({
            "session_id": session.session_id,
            "authentication_token": session.authentication_token.token,
            "csrf_token": session.csrf_token,
        })
    except Exception as e:
        error_message = f"Incorrect session_id."
        Logger.error(__name__, error_message)
        return JsonResponse({"message": error_message}, status=400)

