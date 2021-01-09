from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *


class ProfileAdmin(admin.ModelAdmin):
    model = Profile
    list_display = ('username', 'email', 'nickname', 'date_joined')

    def username(self, obj):
        return obj.user.username
    
    def email(self, obj):
        return obj.user.email

    def date_joined(self, obj):
        return obj.user.date_joined 

admin.site.register(Profile, ProfileAdmin)

class FollowAdmin(admin.ModelAdmin):
    model = Follow
    list_display = ('username', 'follow')

    def username(self, obj):
        return obj.user.username
    
    def follow(self, obj):
        return obj.follow.username

admin.site.register(Follow, FollowAdmin)