from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=8, blank=False)
    image = models.ImageField(default='/default_image.png')

class Follow(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_follow')
    follow = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_follower')
    create_at = models.DateTimeField(auto_now_add=True)