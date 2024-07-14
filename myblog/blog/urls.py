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
# myblog/blog/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from django.conf import settings
from django.conf.urls.static import static

# Router para la API de posts
router = DefaultRouter()
router.register(r'posts', views.PostViewSet)

# URLs de la aplicación 'blog'
urlpatterns = [
    path('', views.HomePageView.as_view(), name='home'),  # Ruta para la página principal
    path('api/', include(router.urls)),  # Ruta para las URLs de la API (opcional)
    path('', views.PostListView.as_view(), name='post_list'),
    path('post/create/', views.PostCreateView.as_view(), name='post_create'),
    path('post/<int:pk>/update/', views.PostUpdateView.as_view(), name='post_update'),
    path('post/<int:pk>/delete/', views.PostDeleteView.as_view(), name='post_delete'),
    # Puedes agregar otras rutas según sea necesario
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

