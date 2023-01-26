from .models import Technician, AutomobileVO, Service
from common.json import ModelEncoder

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["name", "employee_number", "id"]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "vin", "id"]


class ServiceListEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "customer_name",
        "service_date",
        "service_time",
        "reason",
        "vip",
        "status",
        "technician",
        "id"
    ]
    encoders = {
        "technician": TechnicianEncoder()
    }

class ServiceDetailEncoder(ModelEncoder):
    model = Service
    properties = [
        "vin",
        "customer_name",
        "service_date",
        "service_time",
        "reason",
        "vip",
        "status",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder()
    }
