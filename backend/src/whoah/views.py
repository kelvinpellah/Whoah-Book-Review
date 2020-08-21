
# Not part of the project. Was only used to upload books to the database from the excel file

from django.shortcuts import render
from .forms import BookForm
from .models import Book
import csv
import io

def index(request):
    if request.method == "POST":
        csv_file = request.FILES['books'] # extract books by form field name
        data_set = csv_file.read().decode('UTF-8')
        io_string = io.StringIO(data_set)
        next(io_string)
        for column in csv.reader(io_string, delimiter=',', quotechar='|'):
            _, created = Book.objects.update_or_create(
                isbn = column[0],
                title = column[1],
                author = column[2],
                year = column[3],
            ) 
        context = {
            'form': 'success'
        }
        # The following line is commented because we dont want to return anything. Not part of project
        # return render(request,'bookform.html', context)    

    context = {
        'form': BookForm()
    }
    # The following line is commented because we dont want to return anything. Not part of project.
    # return render(request,'bookform.html', context) 
