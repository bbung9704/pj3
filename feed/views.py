from django.shortcuts import render

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Feed, FeedImage

class FeedView(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def post(self, request):
        user = request.user
        body = request.data['body']
        img_list = request.FILES.getlist('image')

        feed = Feed(user=user, body=body)
        feed.save()

        for img in img_list:
            image = FeedImage(feed=feed, image=img)
            image.save()

        return Response({
            "id": feed.id,
            "username": feed.user.username,
            "nickname": feed.user.profile.nickname,
            "body": feed.body,
            "created_at": feed.created_at
        })
