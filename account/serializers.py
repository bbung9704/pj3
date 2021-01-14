from rest_framework import serializers
from .models import *

class FollowSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='follow.id')
    username = serializers.ReadOnlyField(source='follow.username')
    nickname = serializers.ReadOnlyField(source='follow.profile.nickname')
    image = serializers.ReadOnlyField(source='follow.profile.image.url')
    class Meta:
        model = Follow
        fields = ('id', 'username', 'nickname', 'image')

class ProfileSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Profile
        fields = ('id', 'username', 'nickname', 'image')

class UserFollowInfoSerializer(serializers.ModelSerializer):
    nickname = serializers.ReadOnlyField(source='profile.nickname')
    image = serializers.ReadOnlyField(source='profile.image.url')
    follow = serializers.SerializerMethodField()
    follower = serializers.SerializerMethodField()
    feed = serializers.SerializerMethodField()

    def get_follow(self, obj):
        return len(obj.user_follow.all())

    def get_follower(self, obj):
        return len(obj.user_follower.all())

    def get_feed(self, obj):
        return len(obj.user_feed.all())

    class Meta:
        model = User
        fields = ('id', 'username', 'nickname', 'image', 'follow', 'follower', 'feed')