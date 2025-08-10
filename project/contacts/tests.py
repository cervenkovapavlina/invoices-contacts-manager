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
            company_id="12345678",
            tax_id="CZ12345678",
            bank_account="12345678/1000",
            address="Veselá 123/45b, Brno, 61100",
            contact_person="Jana Nováková",
            phone_number="+420777000111",
            email_address="jana.novakova@abc.cz"

        )
        contact.save()
        self.assertFalse(contact.active, "contact.active = False")
        self.assertFalse(contact.external, "contact.external = False")
        self.assertEqual(contact.company_id, "12345678", "contact.company_id = 12345678")
        self.assertEqual(contact.tax_id, "CZ12345678", "contact.tax_id = CZ12345678")
        self.assertEqual(contact.bank_account, "12345678/1000", "contact.bank_account = 12345678/1000")
        self.assertEqual(contact.address, "Veselá 123/45b, Brno, 61100", "contact.address = Veselá 123/45b, Brno, 61100")
        self.assertEqual(contact.contact_person, "Jana Nováková", "contact.contact_person = Jana Nováková")
        self.assertEqual(contact.phone_number, "+420777000111", "contact.phone_number = +420777000111")
        self.assertEqual(contact.email_address, "jana.novakova@abc.cz", "contact.email_address = jana.novakova@abc.cz")

    def test_missing_name_raises_error(self):
        invalid_name_exception = False
        try:
            contact = Contact()
            contact.save()
        except ValidationError as e:
            error_message = "['Ensure this value has at least 3 characters (it has 0).', 'name: ']"
            self.assertEqual(error_message, str(e.messages), f"{error_message} = {str(e.messages)}")
            invalid_name_exception = True
        self.assertTrue(invalid_name_exception, "invalid_name_exception = True")

    def test_empty_string_name_raises_error(self):
        invalid_name_exception = False
        try:
            contact = Contact(name="")
            contact.save()
        except ValidationError as e:
            error_message = "['Ensure this value has at least 3 characters (it has 0).', 'name: ']"
            self.assertEqual(error_message, str(e.messages), f"{error_message} = {str(e.messages)}")
            invalid_name_exception = True
        self.assertTrue(invalid_name_exception, "invalid_name_exception = True")

    def test_short_name_raises_error(self):
        name = "AB"
        invalid_name_exception = False
        try:
            contact = Contact(name=name)
            contact.save()
        except ValidationError as e:
            error_message = f"['Ensure this value has at least 3 characters (it has {len(name)}).', 'name: {name}']"
            self.assertEqual(error_message, str(e.messages), f"{error_message} = {str(e.messages)}")
            invalid_name_exception = True
        self.assertTrue(invalid_name_exception, "invalid_name_exception = True")

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




