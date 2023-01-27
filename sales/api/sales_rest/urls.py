from django.urls import path
from sales_rest.views import api_create_employee, api_create_customer, api_sales

urlpatterns = [
    path("employees/", api_create_employee, name="api_create_employee"),
    path("customers/", api_create_customer, name="api_create_customer"),
    path("sales/", api_sales, name="api_sales")
]
