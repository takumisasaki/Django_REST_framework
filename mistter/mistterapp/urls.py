from django.urls import path
from rest_framework import routers
from django.conf.urls import include
# from .views import signupfunk
from . import views
from .views import FollowView, HomeView, PostCreate, Signup, Login, Logout, SearchListView ,PostView, LikePostView, UserUpdate, PostEdit, PostList, UserDetail,deletefunc, PostViewSet, mypagefunk, likefunc, deletefunc, ReactLogin, ReactHomeView, ReactLogoutView, ReactSignupView, CustomAuthToken, ReactPostCreateView, ReactSearchListView, ReactUserDetailView, ReactMyPageView, ReactFollowView

router = routers.DefaultRouter()
router.register('Post', PostViewSet)
router.register('home', ReactHomeView, basename='home')

urlpatterns = [
    path('', include(router.urls)),
    # path('signup/', Signup.as_view(), name='signup'),
    # path('login/', Login.as_view(), name='login'),
    path('signup/', ReactSignupView.as_view(), name='signup'),
    path('login/', ReactLogin.as_view(), name='login'),
    path('mypage/', ReactMyPageView.as_view(), name='mypage'),
    path('restore-login/', CustomAuthToken.as_view(), name='restore-login'),
    path('logout/', ReactLogoutView.as_view(), name='logout'),
    path('post-create/', ReactPostCreateView.as_view(), name='post-create'),
    path('post-search/', ReactSearchListView.as_view(), name='post-search'),
    path('userdetail/', ReactUserDetailView.as_view(), name='userdetail'),
    path('follow/', ReactFollowView.as_view(), name='follow'),
    path('', Login.as_view(), name='login'),
    path('home/', HomeView.as_view(), name='home'),
    path('loout/', Logout.as_view(), name='logout'),
    # path('post_create/<int:pk>', PostCreate.as_view(), name='post_create'),
    path('post_view/', PostView.as_view(), name='post_view'),
    path('user_update/<int:pk>', UserUpdate.as_view(), name='user_update'),
    path('post_edit/<int:pk>', PostEdit.as_view(), name='post_edit'),
    path('post_delete/<int:pk>', deletefunc, name='post_delete'),
    path('my_page/<int:pk>', mypagefunk, name='my_page'),
    path('toppage/', PostList.as_view(), name='toppage'),
    path('like/', likefunc, name='like'),
    path('follow/', FollowView.as_view(), name="follow"),
    path('user_detail/<int:pk>', UserDetail.as_view(), name="user_detail"),
    path('post_search/', SearchListView.as_view(), name="post_search"),
    path('like_post/<int:pk>', LikePostView.as_view(), name="like_post"),
    # path('test/', SampleChoiceView.as_view(), name='test'),
    path('home/', ReactHomeView.as_view({'get': 'list'}), name='home'),
]