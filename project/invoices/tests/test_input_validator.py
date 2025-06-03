from django.test import TestCase
from invoices.utils.InputValidator import InputValidator
from django.core.exceptions import ValidationError


class InputValidatorTest(TestCase):

    def setUp(self):
        self.validator = InputValidator()

    def test_missing_key_with_default_is_filled(self):
        data = {"name": "Prijate faktury"}
        defaults = {"prefix": "PF"}
        filled_data = self.validator.validate_input(data, [], defaults)
        self.assertEqual(filled_data["prefix"], "PF", f"filled_data[\"prefix\"] = {defaults["prefix"]}")

    def test_all_keys_present_returns_data_unchanged(self):
        data = {"prefix": "VF", "received": False}
        defaults = {"prefix": "PF", "received": True}
        filled_data = self.validator.validate_input(data, [], defaults)
        self.assertEqual(filled_data["prefix"], "VF", f"filled_data[\"prefix\"] = {data["prefix"]}")
        self.assertFalse(filled_data["received"], "filled_data[\"received\"] = False")

    def test_empty_string_replaced_with_default(self):
        data = {"prefix": ""}
        defaults = {"prefix": "PF"}
        filled_data = self.validator.validate_input(data, [], defaults)
        self.assertEqual(filled_data["prefix"], "PF", f"filled_data[\"prefix\"] = {defaults["prefix"]}")

    def test_none_value_replaced_with_default(self):
        data = {"prefix": None}
        defaults = {"prefix": "PF"}
        filled_data = self.validator.validate_input(data, [], defaults)
        self.assertEqual(filled_data["prefix"], "PF", f"filled_data[\"prefix\"] = {defaults["prefix"]}")

    def test_missing_key_without_default_raises_error(self):
        data = {"prefix": "Prijate faktury"}
        defaults = {"prefix": None, "received": None}
        validation_error = False
        try:
            filled_data = self.validator.validate_input(data, [], defaults)
        except ValidationError as e:
            self.assertEqual("Missing value for key: received", e.message,
                             f"Missing value for key: received = {e.message}")
            validation_error = True
        self.assertTrue(validation_error, "validation_error = True")

    def test_empty_string_without_default_raises_error(self):
        data = {"prefix": ""}
        defaults = {"prefix": None}
        validation_error = False
        try:
            filled_data = self.validator.validate_input(data, [], defaults)
        except ValidationError as e:
            self.assertEqual("Missing value for key: prefix", e.message,
                             f"Missing value for key: prefix = {e.message}")
            validation_error = True
        self.assertTrue(validation_error, "validation_error = True")

    def test_mandatory_key_is_filled(self):
        data = {"name": "Prijate faktury"}
        filled_data = self.validator.validate_input(data, ["name"], {})
        self.assertEqual(filled_data["name"], data["name"], f"filled_data[\"name\"] = {data["name"]}")

    def test_missing_mandatory_key_raises_error(self):
        data = {"prefix": "PF"}
        validation_error = False
        try:
            filled_data = self.validator.validate_input(data, ["name"], {})
        except ValidationError as e:
            self.assertEqual("Mandatory key 'name' not found.", e.message,
                             f"Mandatory key 'name' not found. = {e.message}")
            validation_error = True
        self.assertTrue(validation_error, "validation_error = True")

