from django.urls import path
from .views import technician_detail, list_technicians, list_services, service_detail

urlpatterns = [
    path("automobiles/<int:auto_vo_id>/services/", list_services,name="list_services"),
    path("services/", list_services, name="create_service"),
    path("services/<int:id>/", service_detail, name="service_detail"),
    path("technicians/", list_technicians, name="list_technicians"),
    path("technicians/<int:id>/", technician_detail, name="technician_detail"),
]
