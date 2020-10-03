
from django.contrib.auth.models import User
from ..models import Book, BookComment
from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

# Register Serializer


class RegisterUserSerializer(serializers.ModelSerializer):

    confirmPassword = serializers.CharField(
        style={'input_type': 'password'}, write_only=True)  # cuz it is not part of model field

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'confirmPassword']
        extra_kwargs = {'password': {'write_only': True,
                                     'required': True}, 'email': {'required': False}}

    def validate(self, data):
        '''
        * Check if username exists
        * Check length of password
        '''
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("Username already exists.")

        if len(data['password']) < 6:
            raise serializers.ValidationError(
                {'password': 'Password is too short. Minimum 6 characters.'})

        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError(
                {'confirmPassword': "Passwords don't match"})

        return data

    def create(self, validated_data):  # create new user with hashed password
        '''
        create a user.

        '''
        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            password=make_password(validated_data['password'])
        )

        return user

# creating token for every new user registered.


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


# Load books after login
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'isbn', 'title', 'author', 'year']


# Book comment serializer
class CommentSerializer(serializers.ModelSerializer):
    commenter = serializers.SlugRelatedField(
        slug_field='username', queryset=User.objects.all())
    book = serializers.SlugRelatedField(
        slug_field="title", queryset=Book.objects.all())

    class Meta:
        model = BookComment
        fields = ['id', "comment", "commenter", "book"]

    def validate(self, data):
        if len(data['comment']) < 4:
            raise serializers.ValidationError(
                {'comment': 'Comment is too short.Minimum 4 characters.'})
        return data

    # Add new comments
    def create(self, validated_data):
        comment = BookComment.objects.create(
            comment=validated_data['comment'],
            commenter=validated_data['commenter'],
            book=validated_data['book']
        )
        return comment
