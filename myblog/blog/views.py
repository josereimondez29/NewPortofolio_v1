from django.http import JsonResponse
from django.views.generic import TemplateView
from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer
from .forms import PostForm
from django.shortcuts import render, redirect, get_object_or_404
from django.views import View

# Vista del conjunto de vistas para el modelo Post
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# Vista para la página principal
class HomePageView(TemplateView):
    template_name = 'index.html'

# Vista para listar los posts (en formato HTML)
class PostListView(View):
    def get(self, request):
        posts = Post.objects.all().order_by('-created_at')
        return render(request, 'post_list.html', {'posts': posts})

# Vista para crear un nuevo post
class PostCreateView(View):
    def get(self, request):
        form = PostForm()
        return render(request, 'post_form.html', {'form': form})

    def post(self, request):
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('post_list')
        return render(request, 'post_form.html', {'form': form})

# Vista para actualizar un post existente
class PostUpdateView(View):
    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        form = PostForm(instance=post)
        return render(request, 'post_form.html', {'form': form, 'post': post})

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            return redirect('post_list')
        return render(request, 'post_form.html', {'form': form, 'post': post})

# Vista para eliminar un post
class PostDeleteView(View):
    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        return render(request, 'post_confirm_delete.html', {'post': post})

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post.delete()
        return redirect('post_list')

# Vista para obtener posts en formato JSON
def api_get_posts(request):
    posts = list(Post.objects.values('id', 'title', 'image', 'published_date', 'category'))
    return JsonResponse(posts, safe=False)




