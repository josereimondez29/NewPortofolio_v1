from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostListCreate.as_view(), name='post-list-create'),
    # Asegúrate de que estas vistas estén correctamente configuradas
]




