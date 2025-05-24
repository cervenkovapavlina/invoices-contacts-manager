from django.test import TestCase, Client
from django.contrib.auth.models import User
from tokens.utils.generators import generate_token

class SecuredEndpointTest(TestCase):

    def setUp(self):
        self.client = Client()

    def test_valid_token(self):
        User.objects.create_user(username="uzivatel", password="heslo")
        token = generate_token("uzivatel", "heslo")
        response = self.client.get("/", HTTP_TOKEN=token.token)
        self.assertEqual(response.status_code, 200, "response.status_code = 200")
        self.assertEqual(response.json(), {}, "response.json() = {}")

    def test_invalid_token(self):
        response = self.client.get("/", HTTP_TOKEN="wrongtoken")
        self.assertEqual(response.status_code, 401, "response.status_code = 401")
        self.assertEqual(response.json()["message"], "Invalid token.",
                         "response.json()[\"message\"] = \"Invalid token.\"")

    def test_missing_token(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 401, "response.status_code = 401")
        self.assertEqual(response.json()["message"], "Invalid token.",
                         "response.json()[\"message\"] = \"Invalid token.\"")

    def test_empty_string_token(self):
        response = self.client.get("/", HTTP_TOKEN="")
        self.assertEqual(response.status_code, 401, "response.status_code = 401")
        self.assertEqual(response.json()["message"], "Invalid token.",
                         "response.json()[\"message\"] = \"Invalid token.\"")

