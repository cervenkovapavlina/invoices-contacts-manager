from django.test import TestCase
from django.contrib.auth.models import User
from user_sessions.utils.generators import generate_token
from django.core.exceptions import PermissionDenied


class TokenGeneratorTest(TestCase):

    def test_token_generated_with_correct_credentials(self):
        User.objects.create_user(username="uzivatel", password="heslo")
        token = generate_token("uzivatel", "heslo")
        self.assertEqual(len(token.token), 16, "len(token.token) = 16")

    def test_token_not_generated_with_wrong_user_name(self):
        User.objects.create_user(username="uzivatel", password="heslo")
        validation_error = False
        try:
            token = generate_token("chybny_uzivatel", "heslo")
        except PermissionDenied as e:
            self.assertEqual("User chybny_uzivatel and given password not found.", e.args[0],
                             f"User chybny_uzivatel and given password not found. = {e.args[0]}")
            validation_error = True
        self.assertTrue(validation_error, "validation_error = True")

    def test_token_not_generated_with_wrong_password(self):
        User.objects.create_user(username="uzivatel", password="heslo")
        validation_error = False
        try:
            token = generate_token("uzivatel", "chybne_heslo")
        except PermissionDenied as e:
            self.assertEqual("User uzivatel and given password not found.", e.args[0],
                             f"User uzivatel and given password not found. = {e.args[0]}")
            validation_error = True
        self.assertTrue(validation_error, "validation_error = True")

    def test_token_not_generated_with_wrong_credentials(self):
        User.objects.create_user(username="uzivatel", password="heslo")
        validation_error = False
        try:
            token = generate_token("chybny_uzivatel", "chybne_heslo")
        except PermissionDenied as e:
            self.assertEqual("User chybny_uzivatel and given password not found.", e.args[0],
                             f"User chybny_uzivatel and given password not found. = {e.args[0]}")
            validation_error = True
        self.assertTrue(validation_error, "validation_error = True")
