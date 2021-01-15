from django.contrib import admin
from .models import *

class FeedImageInline(admin.TabularInline):
    model = FeedImage

class CommentInline(admin.TabularInline):
    model = Comment

class FeedAdmin(admin.ModelAdmin):
    model = Feed
    inlines = (FeedImageInline, CommentInline,)
    list_display = ('id', 'username', 'created_at')

    def username(self, obj):
        return obj.user.username

admin.site.register(Feed, FeedAdmin)

class AlertFeedAdmin(admin.ModelAdmin):
    model = AlertFeed
    list_display = ('username', 'sendername', 'content_type', 'created_at')

    def username(self, obj):
        return obj.user.username
    def sendername(self, obj):
        return obj.sender.username
    
admin.site.register(AlertFeed, AlertFeedAdmin)

class TagAdmin(admin.ModelAdmin):
    model = Tag
    list_display = ('tag',)
    
admin.site.register(Tag, TagAdmin)


