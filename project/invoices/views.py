from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import json
from invoices.models import Invoice

# Create your views here.

def index(request):
    return HttpResponse("<h1>Index</h1>")

def list(request):
    invoices = Invoice.objects.all()
    context = {"invoices_list": invoices}
    return render(request, "list.html", context)


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

def create(request):
    if request.method == "POST":
        for key, value in request.POST.items():
            print(key, value)
    return render(request, "405.html", status=405)

