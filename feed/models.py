from django.db import models
from django.contrib.auth.models import User

class Feed(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_feed')
    body = models.TextField(max_length=500, blank=False)
    like = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

class FeedImage(models.Model):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE, related_name='feed_feedimage')
    image = models.ImageField()

class Like(models.Model):
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE, related_name='feed_like')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_like')
    created_at = models.DateTimeField(auto_now_add=True)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_comment')
    feed = models.ForeignKey(Feed, on_delete=models.CASCADE, related_name='feed_comment')
    body = models.TextField(max_length=500, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
