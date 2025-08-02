import random
import string
from django.contrib.auth import authenticate
from tokens.models import Token, Session
from django.core.exceptions import PermissionDenied


def generate_random_string(length):
    characters = string.ascii_letters + string.digits + string.punctuation
    random_string = ''.join(random.choice(characters) for i in range(length))
    return random_string


def generate_token(user_name, password):
    user = authenticate(username=user_name, password=password)
    if user is None:
        raise PermissionDenied(f"User {user_name} and given password not found.")
    new_token = generate_random_string(16)
    token = Token(user=user, token=new_token)
    token.save()
    return token


def generate_session(authentication_token, csrf_token):
    session_id = generate_random_string(16)
    session = Session(session_id=session_id, authentication_token=authentication_token, csrf_token=csrf_token)
    session.save()
    return session
