from rest_framework import serializers
from .models import *

# username(user), nickname(profile)
# id(feed), created_at(feed), body(feed), image(feedimage)

class FeedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedImage
        fields = ('image')

class FeedSerializer(serializers.ModelSerializer):
    # User
    username = serializers.ReadOnlyField(source='user.username')
    nickname = serializers.ReadOnlyField(source='user.profile.nickname')
    userimage = serializers.ReadOnlyField(source='user.profile.image.url')
    # FeedImage
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        image = obj.feed_feedimage.all()
        return [img.image.url for img in image]
    
    class Meta:
        model = Feed
        fields = ('id', 'body', 'like', 'created_at', 'username', 'nickname', 'userimage','image')

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    nickname = serializers.ReadOnlyField(source='user.profile.nickname')
    userimage = serializers.ReadOnlyField(source='user.profile.image.url')

    class Meta:
        model = Comment
        fields = ('id', 'username', 'nickname', 'userimage', 'body', 'created_at')