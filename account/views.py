from rest_framework import permissions, generics
from rest_framework.views import APIView
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer

from knox.views import LoginView as KnoxLoginView

from django.contrib.auth.models import User
from django.contrib.auth import login

from .models import *

import os, sys
from django.conf import settings
sys.path.append(os.path.join(settings.BASE_DIR))
from feed.models import Feed, AlertFeed

from .serializers import *

class SignUpView(APIView):
    def post(self, request):
        user = User.objects.create_user(username=request.data['username'], password=request.data['password'], email=request.data['email'])
        profile = Profile(user=user, nickname=request.data['nickname'])

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
        return Response({"id": user.id, "username": user.username, "nickname": profile.nickname, "image": profile.image.url})

class FollowView(APIView):
    permission_class = (permissions.IsAuthenticated,)

    def post(self, request):
        user = request.user
        follow_id = request.data['id']
        follow_user = User.objects.get(id=follow_id)
        if(user == follow_user):
            return Response('Cannot Follow Yourself', status=400)

        follow_list = user.user_follow.all()
        for friend in follow_list:
            if(friend.follow == follow_user):
                return Response('Already Following', status=400)

        follow = Follow(user=user, follow=follow_user)
        follow.save()

        temp_feed = Feed.objects.get(id=26)
        alertfeed = AlertFeed(user=follow_user, sender=user, feed=temp_feed, content_type='follow')
        alertfeed.save()

        return Response({
            "username": user.username,
            "follow": follow_user.username
        })

    def get(self, request):
        user = request.user
        queryset = user.user_follow.all()
        
        serializer = FollowSerializer(queryset, many=True)

        return Response(serializer.data)

class SearchUserView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = [SearchFilter]
    search_fields = ['nickname', 'user__username']
