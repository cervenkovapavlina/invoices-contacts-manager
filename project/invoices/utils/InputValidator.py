from django.core.exceptions import ValidationError


class InputValidator:

    def validate_input(self, data, mandatory_keys, keys_with_defaults):
        for key in mandatory_keys:
            if key not in data:
                raise ValidationError(f"Mandatory key '{key}' not found.")
        for key in keys_with_defaults:
            if key not in data or data[key] is None or data[key] == "":
                if keys_with_defaults[key] is not None:
                    data[key] = keys_with_defaults[key]
                else:
                    raise ValidationError(f"Missing value for key: {key}")
        return data







