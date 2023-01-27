from common.json import ModelEncoder

from .models import AutomobileVO, Employee, Customer, Sale


class EmployeeEncoder(ModelEncoder):
    model = Employee
    properties = [
        "id",
        "employee_name",
        "employee_number",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "customer_name",
        "address",
        "phone_number",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "vin"]


class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "automobile",
        "employee",
        "customer",
        "sale_price",
    ]
    encoders = {
        "employee": EmployeeEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
