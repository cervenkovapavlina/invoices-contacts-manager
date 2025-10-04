from functools import wraps
from user_sessions.models import Token
from invoices.utils.Logger import Logger
from django.http import JsonResponse
from django.core.paginator import Paginator
from django.core.serializers import serialize
from contacts.shared.response_factory import ResponseFactory


def secured_endpoint(endpoint):

    @wraps(endpoint)
    def wrapper(request, *args, **kwargs):
        token = request.headers.get("Authentication-Token")
        if Token.objects.filter(token=token).count() > 0:
            return endpoint(request, *args, **kwargs)
        else:
            error_message = "Invalid token."
            Logger.error(__name__, error_message)
            return JsonResponse({"message": error_message}, status=401)

    return wrapper


def paginate_response(model, page_number):
    items_per_page = 10
    object_list = model.objects.all()
    paginator = Paginator(object_list, items_per_page)
    page_items = paginator.get_page(page_number)
    serialized_page_items = serialize('python', page_items)
    return ResponseFactory.list(serialized_page_items, model.objects.count())
