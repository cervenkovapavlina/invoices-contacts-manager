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
import tokens.views as tokens_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", invoices_views.index, name="index"),

    # path("invoices/", invoices_views.list, name="list"),
    # path("invoices/create", invoices_views.create, name="create"),
    # path("invoices/<id>", invoices_views.detail, name="detail"),

    path("number_rows/", invoices_views.number_row_prefix_list, name="number_row_prefix_list"),
    path("number_rows/create", invoices_views.number_row_prefix_create, name="number_row_prefix_create"),
    path("number_rows/<id>", invoices_views.number_row_prefix_detail, name="number_row_prefix_detail"),

    path("tokens/create", tokens_views.token_create, name="token_create"),
    path("report/", invoices_views.report, name="report")

]
