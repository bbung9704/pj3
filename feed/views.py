from django.shortcuts import render

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import *
from .serializers import *

class FeedView(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # Serializer로 validate check하게 바꾸기
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

    def get(self, request):
        user = request.user
        follows = user.user_follow.all()
        queryset = Feed.objects.none()
        queryset = queryset | user.user_feed.all()

        for follow in follows:
            follow = follow.follow
            queryset = queryset | follow.user_feed.all()

        queryset = queryset.order_by('-created_at')
        serializer = FeedSerializer(queryset, many=True)

        return Response(serializer.data)

    def delete(self, request):
        user = request.user
        data = request.data['id']

        feed = Feed.objects.get(id=data)
        if(feed.user == user):
            feed.delete()
            return Response()        
        return Response('Access Denied', status=400)

class CommentView(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def post(self, request):
        user = request.user
        id = request.data['id']
        feed = Feed.objects.get(id=id)
        body = request.data['body']

        comment = Comment(user=user, feed=feed, body=body)
        comment.save()

        serializer = CommentSerializer(comment)

        return Response(serializer.data)

    def get(self, request):
        id = request.query_params.get('id')
        feed = Feed.objects.get(id=id)
        queryset = feed.feed_comment.all().order_by('created_at')
        serializer = CommentSerializer(queryset, many=True)

        return Response(serializer.data)

    def delete(self, request):
        user = request.user
        id = request.data['id']
        comment = Comment.objects.get(id=id)
        if(user == comment.user):
            comment.delete()
            return Response('')
        return Response('Access Denies', status=400)


