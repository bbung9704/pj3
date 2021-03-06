from rest_framework import serializers
from .models import *


class FeedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedImage
        fields = ('image')

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('tag',)

class FeedSerializer(serializers.ModelSerializer):
    # User
    username = serializers.ReadOnlyField(source='user.username')
    nickname = serializers.ReadOnlyField(source='user.profile.nickname')
    userimage = serializers.ReadOnlyField(source='user.profile.image.url')
    tags = TagSerializer(source='tag', read_only=True, many=True)
    # FeedImage
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        image = obj.feed_feedimage.all()
        return [img.image.url for img in image]
    
    class Meta:
        model = Feed
        fields = ('id', 'body', 'like', 'created_at', 'username', 'nickname', 'userimage','image', 'tags')

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    nickname = serializers.ReadOnlyField(source='user.profile.nickname')
    userimage = serializers.ReadOnlyField(source='user.profile.image.url')

    class Meta:
        model = Comment
        fields = ('id', 'username', 'nickname', 'userimage', 'body', 'created_at')

class AlertFeedSerializer(serializers.ModelSerializer):
    nickname = serializers.ReadOnlyField(source='sender.profile.nickname')
    username = serializers.ReadOnlyField(source='sender.username')
    body = serializers.ReadOnlyField(source='feed.body')
    feed_id = serializers.ReadOnlyField(source='feed.id')

    class Meta:
        model = AlertFeed
        fields = ('id', 'username', 'nickname', 'feed_id', 'body', 'content_type', 'created_at', 'checked')