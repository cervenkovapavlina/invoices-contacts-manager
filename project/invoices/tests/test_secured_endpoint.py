from django.test import TestCase, Client


class SecuredEndpointTest(TestCase):

    def setUp(self):
        self.client = Client()

    def test_valid_token(self):
        response = self.client.get("/", HTTP_TOKEN="abc123")
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

