import 'package:formz/formz.dart';

enum InputError { invalid }

extension ErrorText on InputError {
  String text(String text) {
    return 'Invalid $text';
  }
}

extension PasswordErrorText on PasswordError {
  String text() {
    switch (this) {
      case PasswordError.tooShort:
        return 'Password is too short';
      case PasswordError.noUppercase:
        return 'No Uppercase letter present';
      case PasswordError.noLowercase:
        return 'No Lowercase letter present';
      case PasswordError.noDigit:
        return 'No digit present';
      case PasswordError.noSpecialCharacter:
        return 'No Special Character present. ';
      // Only these special characters are allowed !@#$%^&*()';
      default:
        return 'Password must contain only a-z, A-Z, 0-9, !@#%^&*() ';
    }
  }
}

enum PasswordError {
  tooShort,
  noDigit,
  noUppercase,
  noLowercase,
  noSpecialCharacter
}

class PasswordInput extends FormzInput<String, PasswordError> {
  const PasswordInput.pure() : super.pure('');
  const PasswordInput.dirty(String value) : super.dirty(value);

  @override
  PasswordError? validator(String value) {
    if (value.length < 8) {
      return PasswordError.tooShort;
    }
    if (!value.contains(RegExp(r'[0-9]'))) {
      return PasswordError.noDigit;
    }
    if (!value.contains(RegExp(r'[A-Z]'))) {
      return PasswordError.noUppercase;
    }
    if (!value.contains(RegExp(r'[a-z]'))) {
      return PasswordError.noLowercase;
    }
    if (!value.contains(RegExp(r'[!@#$%^&*()]'))) {
      return PasswordError.noSpecialCharacter;
    }

    return null;
  }
}
