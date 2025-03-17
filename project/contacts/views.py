from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.


# def list(request):
#     return render(request, "contacts_list.html")

def list(request):
    template = loader.get_template("contacts_list.html")
    return HttpResponse(template.render())

def detail(request, id):
    context = {"id": id}
    return render(request, "contacts_detail.html", context)
