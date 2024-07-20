from rest_framework import generics
from blog.models import Post
from blog.api.serializers import PostSerializer

class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

