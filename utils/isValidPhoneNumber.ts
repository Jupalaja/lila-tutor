export function isValidPhoneNumber(phoneNumber: string) {
  const REGEX_PATTERN = /^\+?([0-9]{1,3})?([ -]?[0-9]+)*$/;

  return REGEX_PATTERN.test(phoneNumber);
}
