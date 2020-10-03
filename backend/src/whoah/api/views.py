from .serializers import RegisterUserSerializer, BookSerializer, CommentSerializer
from django.contrib.auth import authenticate, login
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from ..models import Book, BookComment
from rest_framework import status
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken
import random
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

# Register viewset
class RegisterUserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer_valid = serializer.is_valid()
        if serializer_valid:
            user = self.perform_create(serializer)
            token, created = Token.objects.get_or_create(user=user)
            user_authenticate = authenticate(username = request.data.get("username"), password = request.data.get("password"))
            login(request,user_authenticate)
            request.session["user_id"] = user.id
            return Response({'token': token.key,'username': user.username,'user_id': user.id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)    

    def perform_create(self, serializer):
        user = serializer.save()
        return user


# Load featured books after login
class BookViewset(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def list(self, request):
        queryset = self.get_queryset()
        serializer = BookSerializer(queryset, many=True)
        random_books = random.choices(serializer.data, k=12) # Pick 12 random books
        books = []
        i = 1
        for book in random_books:
            while i <= len(random_books):
                books.append(book)
                i += 1
                break
        return Response(books) # Return 12 books

# Search for a book
class BookSearchViewset(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'isbn', 'author', 'year']


# Return a book details
class BookDetailsViewset(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def retrieve(self,request,pk=None):
        queryset = self.get_queryset()
        book = get_object_or_404(queryset, pk=pk)
        serializer = BookSerializer(book)
        return Response(serializer.data)

# Handling book comments
class CommentViewset(viewsets.ModelViewSet):
    queryset = BookComment.objects.all()  
    serializer_class = CommentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['book__title']

    def create(self,request,*args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer_valid = serializer.is_valid(raise_exception=True)
        if serializer_valid:
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND) 