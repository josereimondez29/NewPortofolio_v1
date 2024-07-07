from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=100)
    date = models.DateField()
    content = models.TextField()
    imgSrc = models.CharField(max_length=200)

    def __str__(self):
        assert isinstance(self.title, str), f"Expected str, got {type(self.title).__name__}"
        return self.title


