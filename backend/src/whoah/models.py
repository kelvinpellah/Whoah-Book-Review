from django.db import models

class Book(models.Model):
    isbn = models.CharField(max_length=20, null=True)
    title = models.CharField(max_length=64, null=False)
    author = models.CharField(max_length=30, null=False)
    year = models.IntegerField(null=True)

    def __str__(self):
        return f"{self.title} by {self.author}"

