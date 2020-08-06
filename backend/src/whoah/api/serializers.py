
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import serializers


class RegisterUserSerializer(serializers.ModelSerializer):

    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True) # cuz it is not part of model field
    
    class Meta:
        model = User
        fields = ['id', 'username', 'password','email', 'password2']
        extra_kwargs = {'password': {'write_only': True, 'required': True},'email':{'required':False}}

    def validate(self, data):
        '''
        * Check if username exists
        * Check length of password
        '''
        if User.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError("Username already exists.")
        
        if len(data['password']) < 6:
            raise serializers.ValidationError({'password':'Password is too short. Minimum 6 characters.'})

        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': "Passwords don't match"})

        return data

    def create(self, validated_data):  # create new user with hashed password
        '''
        create a user.

        '''
        user = User.objects.create(
            email = validated_data['email'],
            username = validated_data['username'],
            password = make_password(validated_data['password'])
        )

        return user
