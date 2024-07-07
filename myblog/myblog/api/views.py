from django.shortcuts import render
from django.views import View
from django.http import JsonResponse

# Ejemplo de una vista basada en función
def endpoint_view(request):
    # Lógica para procesar la solicitud
    data = {
        'message': 'Hello, World!'
    }
    return JsonResponse(data)

# Ejemplo de una vista basada en clase
class EndpointView(View):
    def get(self, request):
        # Lógica para procesar la solicitud GET
        data = {
            'message': 'Hello, GET request!'
        }
        return JsonResponse(data)

    def post(self, request):
        # Lógica para procesar la solicitud POST
        received_data = request.POST  # Obtener datos del formulario
        data = {
            'message': 'Hello, POST request!',
            'received_data': received_data
        }
        return JsonResponse(data)

    # Puedes agregar métodos adicionales según sea necesario para manejar otros tipos de solicitudes (PUT, DELETE, etc.)

