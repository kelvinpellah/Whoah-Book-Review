from django.urls import include, path
from . import views


urlpatterns = [
    path('api/', include('whoah.api.urls')),
    path('api/login/', views.login_user, name='login')
    # path('', views.index, name='bookform') # Commented out because it was used for temporarly uploading books from excel file.
]
