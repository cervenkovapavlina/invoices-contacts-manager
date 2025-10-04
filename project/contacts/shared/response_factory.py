from django.http import JsonResponse


class ResponseFactory:

    @staticmethod
    def message(error_message, status_code):
        return JsonResponse({"message": error_message}, status=status_code)

    @staticmethod
    def list(item_list, item_count):
        return JsonResponse({"data": item_list, "count": item_count}, safe=False)

    @staticmethod
    def item(item):
        return JsonResponse({"data": item}, safe=False)

    @staticmethod
    def id(id):
        return JsonResponse({"id": id})

    @staticmethod
    def session(session):
        return JsonResponse({
            "session_id": session.session_id,
            "authentication_token": session.authentication_token.token,
            "csrf_token": session.csrf_token
        })
