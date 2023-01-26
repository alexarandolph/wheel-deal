from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Service
import json
from service_rest.encoders import ServiceDetailEncoder, ServiceListEncoder, TechnicianEncoder, AutomobileVOEncoder

@require_http_methods(["GET", "POST"])
def list_services(request, automobile_vo_id=None):
    if request.method == "GET":
        if automobile_vo_id is not None:
            services = Service.objects.filter(vin=automobile_vo_id)
        else:
            services = Service.objects.all()
            # data = serializers.serialize('json', services)
        return JsonResponse({"services": services}, encoder=ServiceListEncoder, safe=False)

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
