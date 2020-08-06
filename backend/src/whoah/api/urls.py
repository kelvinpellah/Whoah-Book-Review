from rest_framework import routers
from django.urls import include, path
from .views import RegisterUserViewSet

router = routers.DefaultRouter()
router.register('register-user', RegisterUserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

