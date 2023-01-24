from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique = True)
    import_href = models.CharField(max_length=200, unique=True, null=True)

class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveSmallIntegerField(unique=True)

class Service(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    customer_name = models.CharField(max_length=200)
    service_date = models.DateField(null=True)
    service_time = models.TimeField(null=True)
    reason = models.CharField(max_length=400)
    vip = models.BooleanField(default=False)
    status = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.customer_name

    def get_api_url(self):
        return reverse("api_service", kwargs={"pk": self.pk})
