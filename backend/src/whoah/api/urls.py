from rest_framework import routers
from django.urls import include, path
from .views import RegisterUserViewSet, LoginViewset


router = routers.DefaultRouter()
router.register('register', RegisterUserViewSet)
router.register('login', LoginViewset, basename='login-user')

urlpatterns = router.urls

