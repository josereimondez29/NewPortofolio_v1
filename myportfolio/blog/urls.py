#blog/urls.py
from django.urls import path
from .views import PostListView, welcome

urlpatterns = [
    path('', welcome, name='welcome'),
    path('posts/', PostListView.as_view(), name='post-list'),
]

