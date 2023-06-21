from atexit import register
from dataclasses import fields
from rest_framework import serializers
from .models import Post, User
from django.contrib.auth import authenticate

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'text']

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'text']

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)

            if user is None:
                raise serializers.ValidationError("Invalid username/password combination.")

            if not user.is_active:
                raise serializers.ValidationError("User is deactivated.")
            
            data['user'] = user
            data['user_id'] = user.id

        else:
            raise serializers.ValidationError("Must include 'username' and 'password'.")

        return data
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username'] 
    
class HomeSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'categories', 'text']

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'nickname', 'email', 'password')
        extra_kwargs = {
            'username': {'label': 'user_id'},
            'nickname': {'label': 'ニックネーム'},
            'email': {'label': 'メールアドレス'},
            'password': {'label': 'パスワード', 'write_only': True},
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    
class PostCreateSerializer(serializers.Serializer):
    categories = serializers.ChoiceField(
        choices=[
            ('仕事', '仕事'),
            ('学校', '学校'),
            ('ギャンブル', 'ギャンブル'),
        ],
        required=True,
    )
    text = serializers.CharField(max_length=150, required=True)
    user = serializers.IntegerField() 


# SearchListSerializer
class SearchListSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Post
        fields = ['id', 'user', 'categories', 'text']