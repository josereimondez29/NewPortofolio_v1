"""
URL configuration for myblog project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# myblog/myblog/api/urls.py

# myblog/myblog/api/urls.py

from django.urls import path
from . import views  # Asegúrate de que el archivo views.py esté en el mismo directorio

urlpatterns = [
    path('endpoint/', views.endpoint_view, name='endpoint'),
    path('endpoint-class/', views.EndpointView.as_view(), name='endpoint_class'),
    # Otros paths según sea necesario
]

