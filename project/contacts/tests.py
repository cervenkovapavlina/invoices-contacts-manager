from django.test import TestCase
from contact.models import Contact


class ContactTest(TestCase):

    def test_default_values(self):
        contact = Contact(name="Firma ABC")
        contact.save()
        self.assertGreater(contact.id, 0, "contact.id > 0")
        self.assertTrue(contact.active, "contact.active = True")
        self.assertTrue(contact.external, "contact.external = True")
        self.assertEqual(contact.company_id, "", "contact.company_id = \"\"")
        self.assertEqual(contact.tax_id, "", "contact.tax_id = \"\"")
        self.assertEqual(contact.bank_account, "", "contact.bank_account = \"\"")
        self.assertEqual(contact.address, "", "contact.address = \"\"")
        self.assertEqual(contact.contact_person, "", "contact.contact_person = \"\"")
        self.assertEqual(contact.phone_number, "", "contact.phone_number = \"\"")
        self.assertEqual(contact.email_address, "", "contact.email_address = \"\"")

    def test_all_fields_set(self):
        contact = Contact(
            name="Firma ABC",
            active=False,
            external=False,
        )
        contact.save()
        self.assertGreater(contact.id, 0, "contact.id > 0")
        self.assertTrue(contact.active, "contact.active = True")
        self.assertTrue(contact.external, "contact.external = True")
        self.assertEqual(contact.company_id, "", "contact.company_id = \"\"")
        self.assertEqual(contact.tax_id, "", "contact.tax_id = \"\"")
        self.assertEqual(contact.bank_account, "", "contact.bank_account = \"\"")
        self.assertEqual(contact.address, "", "contact.address = \"\"")
        self.assertEqual(contact.contact_person, "", "contact.contact_person = \"\"")
        self.assertEqual(contact.phone_number, "", "contact.phone_number = \"\"")
        self.assertEqual(contact.email_address, "", "contact.email_address = \"\"")
