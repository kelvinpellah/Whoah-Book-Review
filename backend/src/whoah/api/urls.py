from rest_framework import routers
from django.urls import include, path
from .views import RegisterUserViewset, LoginViewset, BookViewset


router = routers.DefaultRouter()
router.register('register', RegisterUserViewset)
router.register('login', LoginViewset, basename='login-user')
router.register('books', BookViewset)

urlpatterns = router.urls

