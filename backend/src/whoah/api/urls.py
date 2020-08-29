from rest_framework import routers
from django.urls import include, path
from .views import RegisterUserViewset, LoginViewset, BookViewset,BookSearchViewset,BookDetailsViewset


router = routers.DefaultRouter()
router.register('register', RegisterUserViewset)
router.register('login', LoginViewset, basename='login-user')
router.register('books', BookViewset)
router.register('book', BookSearchViewset)
router.register('book/:id', BookDetailsViewset)

urlpatterns = router.urls

