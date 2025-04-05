from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from django.template import loader
import json
from invoices.models import Invoice
from invoices.models import NumberRow
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def index(request):
    return HttpResponse(json.dumps({}))


def number_row_list(request):
    return JsonResponse(serialize('python', NumberRow.objects.all()), safe=False)


def detail(request, id):
    try:
        invoice = Invoice.objects.get(id=id)
        context = {"invoice": invoice}
        return render(request, "detail.html", context)
    except:
        return render(request, "404.html", status=404)


def report(request):
    numbers = [1, 2, 3, 4]
    # numbers = {"number1": 1, "number2": 2, "number3": 3, "number4": 4}
    return HttpResponse(json.dumps(numbers))


@csrf_exempt
def number_row_create(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        number_row = NumberRow(prefix=json_data["prefix"])
        number_row.save()
        return HttpResponse(json.dumps(number_row.id))
    return render(request, "405.html", status=405)


