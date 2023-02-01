from common.json import ModelEncoder

from .models import Customer, SaleVO, ServiceVO

class SaleVOsListEncoder(ModelEncoder):
    model = SaleVO
    properties = [
        "import_href",
        "automobile",
        "sale_price"
    ]

class ServiceVOsListEncoder(ModelEncoder):
    model = ServiceVO
    properties = [
        "vin",
        "service_date",
        "service_time"
    ]
