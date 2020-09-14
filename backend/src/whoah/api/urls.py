from rest_framework import routers
from django.urls import include, path
from .views import RegisterUserViewset, BookViewset,BookSearchViewset,BookDetailsViewset, CommentViewset


router = routers.DefaultRouter()
router.register('register', RegisterUserViewset)
router.register('books', BookViewset)
router.register('book', BookSearchViewset)
router.register('book/:id', BookDetailsViewset)
router.register('comment', CommentViewset)

urlpatterns = router.urls

