# myblog/blog/api/serializers.py
from rest_framework import serializers
from blog.models import Post  # Importa el modelo usando la ruta completa

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
