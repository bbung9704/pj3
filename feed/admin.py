from django.contrib import admin
from .models import *

class FeedImageInline(admin.TabularInline):
    model = FeedImage

class FeedAdmin(admin.ModelAdmin):
    model = Feed
    inlines = (FeedImageInline,)
    list_display = ('username', 'created_at')

    def username(self, obj):
        return obj.user.username

admin.site.register(Feed, FeedAdmin)
