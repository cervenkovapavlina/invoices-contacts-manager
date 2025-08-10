from django.test import TestCase
from contacts.models import Contact
from django.core.exceptions import ValidationError


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
            contact = Contact(company_id="12345678")
            contact.save()
        except ValidationError as e:
            error_message = "['Ensure this value has at least 3 characters (it has 0).', 'name: ']"
            self.assertEqual(error_message, str(e.messages), f"{error_message} = {e.messages}")
            invalid_name_exception = True
        self.assertTrue(invalid_name_exception, "invalid_name_exception = True")

    def test_empty_string_name_raises_error(self):
        pass

    def test_none_name_raises_error(self):
        pass

    def test_short_name_raises_error(self):
        pass

    def test_duplicate_name_raises_error(self):
        pass
