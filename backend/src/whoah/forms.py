
# Not part of the project. Was only used to upload books to the database from the excel file

from django import forms
from .models import Book
import io
import csv

# import books to Db
class BookForm(forms.Form):
    books = forms.FileField()


  