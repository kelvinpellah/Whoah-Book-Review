from rest_framework import routers
from django.urls import include, path
from .views import RegisterUserViewSet
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register('register', RegisterUserViewSet, basename='register-user')

urlpatterns = router.urls

