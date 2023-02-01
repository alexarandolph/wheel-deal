import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "customer_project.settings")
django.setup()

# Import models from service_rest, here.
from customer_rest.models import
# from service_rest.models import Something
from customer_rest.models import SaleVO, ServiceVO

def get_service():
    response = requests.get("http://service-api:8080/api/services/")
    content = json.loads(response.content)
    for service in content["services"]:
        ServiceVO.objects.update_or_create(
            import_href = service["href"],
            defaults={"vin": service["vin"],
            "service_date": service["service_date"],
            "service_time": service["service_time"]
            },
        )

# def get_automobile():
#     response = requests.get("http://inventory-api:8100/api/automobiles/")
#     content = json.loads(response.content)
#     for automobile in content["autos"]:
#         AutomobileVO.objects.update_or_create(
#             import_href = automobile["href"],
#             defaults={"vin": automobile["vin"]},
#         )

def get_sale():
    response = requests.get("http://sales-api:8090/api/sales/")
    content = json.loads(response.content)
    for sale in content["sales"]:
        SaleVO.objects.update_or_create(
            import_href = sale["href"],
            defaults={"sale_price": sale["sale_price"],
            "automobile": sale["automobile"],
            },
        )

def poll():
    while True:
        print('Service poller polling for data')
        try:
            get_service()
            # get_automobile()
            get_sale()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(400)


if __name__ == "__main__":
    poll()
