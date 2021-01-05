from django.contrib import admin
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
