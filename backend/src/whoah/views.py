from django.contrib.auth import authenticate, login,logout
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response

####################################################################################
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

#####################################################################################

#Login API
class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer_valid = serializer.is_valid()
        if serializer_valid:
            user = serializer.validated_data['user']
            if 'user_id' in request.session.keys():
                logout(request)
                return Response({'success':"You are logged out."})
            token, created = Token.objects.get_or_create(user=user)
            user_authenticate = authenticate(username = request.data.get("username"), password = request.data.get("password"))
            login(request,user_authenticate)
            request.session["user_id"] = user.id
            return Response({'token': token.key,'username': user.username,'user_id': user.id})  

        return Response({'error_message': 'Wrong username or password.'}, status=HTTP_404_NOT_FOUND)    

