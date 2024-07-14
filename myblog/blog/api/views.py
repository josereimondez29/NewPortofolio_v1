# myblog/blog/api/views.py


from blog.models import Post  # Importa el modelo Post desde blog.models
from blog.serializers import PostSerializer  # Importa el serializador PostSerializer desde blog.serializers
from rest_framework import viewsets

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

