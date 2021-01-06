from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('api/auth/', include('account.urls')),
    path('api/auth/', include('knox.urls')),
    path('admin/', admin.site.urls),
]
