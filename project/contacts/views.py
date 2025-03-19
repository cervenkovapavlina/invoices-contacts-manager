from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from contacts.models import Contact

# Create your views here.


def list(request):
    contacts = Contact.objects.all()
    context = {"contacts_list": contacts}
    return render(request, "contacts_list.html", context)


def detail(request, id):
    try:
        contact = Contact.objects.get(id=id)
        context = {"contact": contact}
        return render(request, "contact_detail.html", context)
    except:
        return render(request, "contacts_404.html", status=404)
