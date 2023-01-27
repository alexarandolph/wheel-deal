from django.db import models
from django.urls import reverse

# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    vin = models.CharField(max_length=17, unique=True)


class Employee(models.Model):
    employee_name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.employee_name

    def get_api_url(self):
        return reverse("api_create_employee", kwargs={"pk": self.id})


class Customer(models.Model):
    customer_name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return self.customer_name

    def get_api_url(self):
        return reverse("api_create_customer", kwargs={"pk": self.id})


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE
    )
    employee = models.ForeignKey(
        Employee,
        related_name="sales",
        on_delete=models.CASCADE
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE
    )
    sale_price= models.PositiveIntegerField()
