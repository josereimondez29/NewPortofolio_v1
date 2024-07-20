# myblog/blog/api/urls.py
from django.urls import path
from blog.api.views import PostListAPIView  # Importa la vista usando la ruta completa

urlpatterns = [
    path('posts/', PostListAPIView.as_view(), name='post-list'),
]

