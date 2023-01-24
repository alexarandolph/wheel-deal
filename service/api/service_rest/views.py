from django.core import serializers
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Service
import json
from common.json import ModelEncoder, DateEncoder
from datetime import datetime, date, time


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



@require_http_methods(["GET", "POST"])
def list_services(request, automobile_vo_id=None):
    if request.method == "GET":
        if automobile_vo_id is not None:
            services = Service.objects.filter(vin=automobile_vo_id)
        else:
            services = Service.objects.all()
            data = serializers.serialize('json', services)
        return HttpResponse(data, content_type='application/json')

    else:
        content = json.loads(request.body)
        technician = Technician.objects.get(id=content["technician"])
        content["technician"] = technician
        try:
            vin = AutomobileVO.objects.get(vin=content["vin"])
            content["vip"] = True

        except AutomobileVO.DoesNotExist:
            content["vip"] = False

        service = Service.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceListEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "GET", "PUT"])
def service_detail(request, id):
    if request.method == "GET":
        service = Service.objects.get(id=id)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        try:
            service = Service.objects.get(id=id)
            service.delete()
            return JsonResponse(
                {"You deleted that?": service > 0},
                safe=False,
            )
        except Service.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else:
        content = json.loads(request.body)
        Service.objects.filter(id=id).update(**content)
        service = Service.objects.get(id=id)
        return JsonResponse(
            service,
            encoder=ServiceDetailEncoder,
            safe=False
        )

@require_http_methods(["GET", "POST"])
def list_technicians(request):

    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
                return JsonResponse(
                        {"message": "Could not create technician successfully"},
                        status=400,
                    )


@require_http_methods(["DELETE", "GET"])
def technician_detail(request, id):
    if request.method == "GET":
        technician = Technician.objects.get(id=id)
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=id)
            technician.delete()
            return JsonResponse(
                {"You deleted that?": technician > 0},
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
