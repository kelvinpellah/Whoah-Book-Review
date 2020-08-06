from django.urls import include, path


urlpatterns = [
    path('api/', include('whoah.api.urls'))
]
