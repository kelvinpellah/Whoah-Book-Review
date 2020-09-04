from django.db import models
from django.contrib.auth.models import User


class Book(models.Model):
    isbn = models.CharField(max_length=20, null=True)
    title = models.CharField(max_length=64, null=False)
    author = models.CharField(max_length=30, null=False)
    year = models.IntegerField(null=True)

    def __str__(self):
        return f"{self.title} by {self.author}"

class BookComment(models.Model):
    commenter = models.ForeignKey(User, on_delete=models.CASCADE, null=False) 
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    comment = models.TextField(max_length=300, null=False, blank=False)

    def __str__(self):
        return f"New comment from {self.commenter}"