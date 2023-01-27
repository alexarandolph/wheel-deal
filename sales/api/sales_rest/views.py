from django.shortcuts import render
from .models import AutomobileVO, Sale, Employee, Customer
from django.views.decorators.http import require_http_methods
import json
from django.http import JsonResponse

from .encoders import (
    EmployeeEncoder,
    CustomerEncoder,
    SaleEncoder,
    AutomobileVOEncoder
)

# Create your views here.

@require_http_methods(["POST", "GET"])
def api_create_employee(request):
    if request.method == "GET":
        employees = Employee.objects.all()
        return JsonResponse({"employees": employees}, encoder=EmployeeEncoder)
    else:
        content = json.loads(request.body)
        employee = Employee.objects.create(**content)
        return JsonResponse(employee, encoder=EmployeeEncoder, safe=False)


@require_http_methods(["POST", "GET"])
def api_create_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse({"customers": customers}, encoder=CustomerEncoder)
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(customer, encoder=CustomerEncoder, safe=False)


@require_http_methods(["POST", "GET"])
def api_sales(request, employee_id=None, customer_id=None):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse({"sales": sales}, encoder=SaleEncoder)
    else:
        content = json.loads(request.body)
        employee_id = content["employee"]
        employee = Employee.objects.get(id=employee_id)
        content["employee"] = employee
        customer_id = content["customer"]
        customer = Customer.objects.get(id=customer_id)
        content["customer"] = customer
        try:
            automobile_vin = content["automobile"]
            automobile = AutomobileVO.objects.get(vin=automobile_vin)
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid Automobile id"}, status=400)

        sales = Sale.objects.create(**content)
        return JsonResponse(sales, encoder=SaleEncoder, safe=False)
