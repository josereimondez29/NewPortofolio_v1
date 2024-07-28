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
    path('api/posts/', views.api_get_posts, name='api_get_posts'),  # Ruta para la vista de la API en formato JSON
    path('api/', include(router.urls)),  # Ruta para las URLs de la API de REST framework
    path('post/', views.PostListView.as_view(), name='post_list'),
    path('post/create/', views.PostCreateView.as_view(), name='post_create'),
    path('post/<int:pk>/update/', views.PostUpdateView.as_view(), name='post_update'),
    path('post/<int:pk>/delete/', views.PostDeleteView.as_view(), name='post_delete'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



