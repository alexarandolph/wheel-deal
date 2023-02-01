from django.db import models
from django.urls import reverse
from inventory.api.inventory_rest.models import Automobile

class Customer(models.Model):
    user_name = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(null=True)
    name = models.CharField(max_length=300)
    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.pk})

    class Meta:
        ordering = ['name']

class SaleVO(models.Model):
    sale_price= models.PositiveIntegerField()
    import_href = models.CharField(max_length=200, unique=True, null=True)
    automobile = models.ForeignKey(Automobile, on_delete=models.CASCADE)

class ServiceVO(models.Model):
    vin = models.CharField(max_length=50)
    service_date = models.DateField(null=True)
    service_time = models.TimeField(null=True)

# class AutomobileVO(models.Model):
#     vin = models.CharField(max_length=17, unique = True)
#     import_href = models.CharField(max_length=200, unique=True, null=True)
