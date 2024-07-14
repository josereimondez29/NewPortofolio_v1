# myblog/blog/views.py

# myblog/blog/views.py

from django.views.generic import TemplateView
from django.http import JsonResponse
from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer
from .forms import PostForm
from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.urls import reverse_lazy

# Vista del conjunto de vistas para el modelo Post
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()  # Aquí debería ser Post.objects.all() o Post.objects.filter() según tus necesidades
    serializer_class = PostSerializer
    
class HomePageView(TemplateView):
    template_name = 'index.html'
    
class PostListView(View):
    def get(self, request):
        posts = Post.objects.all().order_by('-created_at')
        return render(request, 'post_list.html', {'posts': posts})

class PostCreateView(View):
    def get(self, request):
        form = PostForm()
        return render(request, 'post_form.html', {'form': form})

    def post(self, request):
        form = PostForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('post_list')
        else:
            return render(request, 'post_form.html', {'form': form})

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
        else:
            return render(request, 'post_form.html', {'form': form, 'post': post})

class PostDeleteView(View):
    def get(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        return render(request, 'post_confirm_delete.html', {'post': post})

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        post.delete()
        return redirect('post_list')

