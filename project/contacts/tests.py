from django.test import TestCase
from contacts.models import Contact
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError


class ContactTest(TestCase):

    def test_default_values(self):
        contact = Contact(name="Firma ABC")
        contact.save()
        self.assertGreater(contact.id, 0, "contact.id > 0")
        self.assertTrue(contact.active, "contact.active = True")
        self.assertTrue(contact.external, "contact.external = True")

    def test_all_fields_set(self):
        contact = Contact(
            name="Firma ABC",
            active=False,
            external=False,
            registration_number="12345678",
            vat_number="CZ12345678",
            bank_account="12345678/1000",
            address="Veselá 123/45b, Brno, 61100",
            contact_person="Jana Nováková",
            phone_number="+420777000111",
            email_address="jana.novakova@abc.cz"

        )
        contact.save()
        self.assertFalse(contact.active, "contact.active = False")
        self.assertFalse(contact.external, "contact.external = False")
        self.assertEqual(contact.registration_number, "12345678", "contact.registration_number = 12345678")
        self.assertEqual(contact.vat_number, "CZ12345678", "contact.vat_number = CZ12345678")
        self.assertEqual(contact.bank_account, "12345678/1000", "contact.bank_account = 12345678/1000")
        self.assertEqual(contact.address, "Veselá 123/45b, Brno, 61100", "contact.address = Veselá 123/45b, Brno, 61100")
        self.assertEqual(contact.contact_person, "Jana Nováková", "contact.contact_person = Jana Nováková")
        self.assertEqual(contact.phone_number, "+420777000111", "contact.phone_number = +420777000111")
        self.assertEqual(contact.email_address, "jana.novakova@abc.cz", "contact.email_address = jana.novakova@abc.cz")

    def assert_name_failure(self, invalid_name, create_empty_contact=False):
        invalid_name_exception = False
        if invalid_name is None:
            length = 0
        else:
            length = len(invalid_name)
        try:
            if create_empty_contact:
                contact = Contact()
            else:
                contact = Contact(name=invalid_name)
            contact.save()
        except ValidationError as e:
            error_message = f"['Ensure this value has at least 3 characters (it has {length}).', 'name: {invalid_name}']"
            self.assertEqual(error_message, str(e.messages), f"{error_message} = {str(e.messages)}")
            invalid_name_exception = True
        except IntegrityError as e:
            error_message = "NOT NULL constraint failed: contacts_contact.name"
            self.assertEqual(error_message, str(e), f"{error_message} = {str(e)}")
            invalid_name_exception = True
        self.assertTrue(invalid_name_exception, "invalid_name_exception = True")

    def test_missing_name_raises_error(self):
        self.assert_name_failure(invalid_name="", create_empty_contact=True)

    def test_empty_string_name_raises_error(self):
        self.assert_name_failure(invalid_name="")

    def test_none_name_raises_error(self):
        self.assert_name_failure(invalid_name=None)

    def test_short_name_raises_error(self):
        self.assert_name_failure(invalid_name="AB")

    def test_min_length_name_is_valid(self):
        name = "ABC"
        contact = Contact(name=name)
        contact.save()
        self.assertEqual(len(name), len(contact.name), f"{len(name)} = {len(contact.name)}")

    def test_duplicate_name_raises_error(self):
        name = "ABC"
        duplicate_name_error = False
        try:
            contact = Contact(name=name)
            contact.save()
            duplicate_contact = Contact(name=name)
            duplicate_contact.save()
        except IntegrityError as e:
            error_message = "UNIQUE constraint failed: contacts_contact.name"
            self.assertEqual(error_message, str(e), f"{error_message} = {str(e)}")
            duplicate_name_error = True
        self.assertTrue(duplicate_name_error, "duplicate_name_error = True")
