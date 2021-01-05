from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Profile

class SignUpView(APIView):
    def post(self, request):
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'], email=request.data['email'])
        profile = Profile(user=user, nickname=request.data['nickname'], image=None)

        user.save()
        profile.save()
        
        token = Token.objects.create(user=user)
        
        return Response({
            "username": user.username,
            "nickname": profile.nickname,
            "token": token.key
        })

class LoginView(APIView):
    def post(self,request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user is not None:
            profile = user.profile
            token = Token.objects.get(user=user)
            return Response({
                "username": user.username,
                "nickname": profile.nickname,
                "token": token.key
            })
        else:
            return Response('Wrong login info',status=401)