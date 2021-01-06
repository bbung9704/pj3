from django.urls import path, include
from .views import *
from knox.views import LogoutView, LogoutAllView

urlpatterns = [
    path('signup/', SignUpView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('logoutall/', LogoutAllView.as_view()),
    path('userinfo/', UserInfoView.as_view()),
]
