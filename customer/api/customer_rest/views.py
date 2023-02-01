from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Customer, SaleVO, ServiceVO
from .encoders import SaleVOEncoder, ServiceVOEncoder
import json

@require_http_methods(["POST"])
def customer_login(request):
    if request.method == 'POST':
        user_name = request.POST.get('user_name')
        password = request.POST.get('password')
        customer = authenticate(username=user_name, password=password)
        if customer:
            login(request, customer)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Invalid login'})
    return JsonResponse({'error': 'Invalid request method'})

def customer_logout(request):
    logout(request)
    return JsonResponse({'success': True})

@require_http_methods(["POST"])
def customer_signup(request):
    if request.method == 'POST':
        user_name = request.POST.get('user_name')
        password = request.POST.get('password')
        email = request.POST.get('email')
        name = request.POST.get('name')

        customer = Customer(user_name=user_name, password=password, email=email, name=name)
        customer.save()

        customer = authenticate(username=user_name, password=password)
        if customer:
            login(request, customer)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Failed to login'})
    return JsonResponse({'error': 'Invalid request method'})

@require_http_methods(["GET"])
def sales_history_by_vin(request, vin=None):
    if request.method == "GET":
        if vin is not None:
            sales = SaleVO.objects.filter(automobile__vin=vin)
        else:
            return JsonResponse(
                {"message": "Please provide the VIN number."},
                status=400,
            )

        if not sales:
            return JsonResponse(
                {"message": "No sales history found for the given VIN."},
                status=404,
            )

        return JsonResponse(
            {"sales": sales.values()},
            encoder=SaleVOEncoder,
            safe=False,
        )

@require_http_methods(["POST"])
def schedule_service_appointment(request):
    content = json.loads(request.body)
    try:
        service = ServiceVO.objects.create(**content)
    except Exception as e:
        return JsonResponse(
        {"message": str(e)},
        status=400,
    )
    return JsonResponse(
        service,
        encoder=ServiceVOEncoder,
        safe=False,
    )
