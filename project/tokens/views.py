from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from invoices.utils.InputValidator import InputValidator
from tokens.utils.generators import generate_token
from invoices.utils.Logger import Logger
from django.middleware.csrf import get_token
from tokens.models import Session
from tokens.utils.generators import generate_random_string

@csrf_exempt
def token_create(request):
    if request.method == "POST":
        try:
            json_data = json.loads(request.body)
            validator = InputValidator()
            filled_data = validator.validate_input(json_data, ["user_name", "password"], {})
            authentication_token = generate_token(filled_data["user_name"], filled_data["password"])
            csrf_token = get_token(request)
            print("authen token: " + authentication_token)
            print("csrf token: " + csrf_token)
            session_id = create_session(authentication_token, csrf_token)
            return JsonResponse({
                "authentication_token": authentication_token,
                "csrf_token": csrf_token,
                "session_id": session_id
            })
        except Exception as e:
            error_message = f"Invalid input. Required data not provided. {e}"
            Logger.error(__name__, error_message)
            return JsonResponse({"message": error_message}, status=400)
    error_message = "Method not allowed."
    Logger.error(__name__, error_message)
    return JsonResponse({"message": error_message}, status=405)

def create_session(authentication_token, csrf_token):
    session_id = generate_random_string(16)
    session = Session()
    session.session_id = session_id
    session.authentication_token = authentication_token
    session.csrf_token = csrf_token
    session.save()
    print("ID: " + str(session.id))
    return session_id
@csrf_exempt
def get_session(request, session_id):
    session = Session.objects.filter(session_id=session_id)
    return JsonResponse({
        "authentication_token": session.authentication_token,
        "csrf_token": session.csrf_token,
        "session_id": session.session_id
    })


