from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User
from .models import Profile

class SignUpView(APIView):
    def post(self, request):
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'], email=request.data['email'])
        profile = Profile(user=user, nickname=request.data['nickname'], image=None)

        user.save()
        profile.save()
        
        token = Token.objects.create(user=user)
        
        return Response({
            "id": user.username,
            "email": user.email,
            "nickname": profile.nickname,
            "token": token.key
        })
