from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostListCreate.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', views.PostDetail.as_view(), name='post-detail'),
]




