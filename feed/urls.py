from django.urls import path, include
from .views import *

urlpatterns = [
    path('feed/', FeedView.as_view()),
    path('comment/', CommentView.as_view()),
    path('like/', LikeView.as_view()),
    path('alertfeed/', AlertFeedView.as_view()),
]