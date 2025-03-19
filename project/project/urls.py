"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
import invoices.views as invoices_views
import contacts.views as contacts_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", invoices_views.index, name="index"),
    path("invoices/", invoices_views.list, name="list"),
    path("invoices/create", invoices_views.create, name="create"),
    path("invoices/<id>", invoices_views.detail, name="detail"),
    path("invoices/report/numbers", invoices_views.report, name="report"),
    path("contacts/", contacts_views.list, name="contacts_list"),
    path("contacts/<id>", contacts_views.detail, name="contact_detail"),
]

