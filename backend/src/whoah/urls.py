from django.urls import include, path
from . import views


urlpatterns = [
    path('api/', include('whoah.api.urls')),
    path('api/login/', views.CustomAuthToken.as_view()),
    path('api/logout/',views.logout_view, name='logout')
    # path('', views.index, name='bookform') # Commented out because it was used for temporarly uploading books from excel file.
]
