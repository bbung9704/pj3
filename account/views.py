from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer

from knox.views import LoginView as KnoxLoginView

from django.contrib.auth.models import User
from django.contrib.auth import login

from .models import Profile

class SignUpView(APIView):
    def post(self, request):
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'], email=request.data['email'])
        profile = Profile(user=user, nickname=request.data['nickname'], image=None)

        user.save()
        profile.save()
                
        return Response({
            "username": user.username,
            "nickname": profile.nickname,
        })

class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginView, self).post(request, format=None)

class UserInfoView(APIView):
    def get(self, request):
        user = request.user
        profile = user.profile
        return Response({"username": user.username, "nickname": profile.nickname})
