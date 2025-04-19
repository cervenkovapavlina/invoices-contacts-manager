from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from django.template import loader
import json
from invoices.models import Invoice
from invoices.models import NumberRowPrefix, NumberRowValue, InvoiceItem
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def index(request):
    return JsonResponse({})


def number_row_prefix_list(request):
    return JsonResponse(serialize('python', NumberRowPrefix.objects.all()), safe=False)


def number_row_prefix_detail(request, id):
    try:
        number_row_prefix = NumberRowPrefix.objects.get(id=id)
        data = serialize('python', [number_row_prefix])
        return JsonResponse(data[0], safe=False)
    except:
        return render(request, "404.html", status=404)


@csrf_exempt
def number_row_prefix_create(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        number_row_prefix = NumberRowPrefix(prefix=json_data["prefix"])
        number_row_prefix.save()
        return JsonResponse({"Final prefix": number_row_prefix.get_final_prefix()})
    return render(request, "405.html", status=405)


def number_row_value_list(request):
    return JsonResponse(serialize('python', NumberRowValue.objects.all()), safe=False)

@csrf_exempt
def number_row_value_create(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        try:
            number_row_prefix = NumberRowPrefix.objects.get(prefix=json_data["prefix"])
            number_row_value = NumberRowValue(prefix=number_row_prefix)
            number_row_value.save()
            return JsonResponse({"Final value": number_row_value.get_final_value()})
        except:
            return render(request, "404.html", status=404)
    return render(request, "405.html", status=405)


def invoice_item_list(request):
    return JsonResponse(serialize('python', InvoiceItem.objects.all()), safe=False)


def invoice_item_detail(request, id):
    try:
        invoice_item = InvoiceItem.objects.get(id=id)
        serialized_data = serialize('python', [invoice_item])
        return JsonResponse(serialized_data[0], safe=False)
    except:
        return render(request, "404.html", status=404)


@csrf_exempt
def invoice_item_create(request):
    if request.method == "POST":
        json_data = json.loads(request.body)
        try:
            invoice = Invoice.objects.get(id=json_data["invoice"])
            invoice_item = InvoiceItem(name=json_data["name"], description=json_data["description"], unit_price=json_data["unit_price"],
                                       unit_count=json_data["unit_count"], invoice=invoice)
            invoice_item.save()
            return JsonResponse({"id": invoice_item.id})
        except:
            return render(request, "404.html", status=404)
    return render(request, "405.html", status=405)


