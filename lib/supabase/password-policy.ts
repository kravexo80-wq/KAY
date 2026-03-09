import type { Locale } from "@/lib/i18n/config";

export const passwordPolicy = {
  minLength: 10,
  maxLength: 64,
  htmlPattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9])\\S{10,64}",
} as const;

function getPasswordPolicyMessage(locale: Locale) {
  return locale === "ar"
    ? "يجب أن تتكون كلمة المرور من 10 إلى 64 حرفاً، وأن تحتوي على حرف كبير وحرف صغير ورقم ورمز واحد على الأقل، من دون مسافات."
    : "Passwords must be 10 to 64 characters and include at least one uppercase letter, one lowercase letter, one number, and one symbol, with no spaces.";
}

export function getPasswordPolicyTitle(locale: Locale) {
  return getPasswordPolicyMessage(locale);
}

export function getPasswordValidationError(
  password: string,
  locale: Locale,
) {
  if (password.length < passwordPolicy.minLength) {
    return getPasswordPolicyMessage(locale);
  }

  if (password.length > passwordPolicy.maxLength) {
    return getPasswordPolicyMessage(locale);
  }

  if (/\s/.test(password)) {
    return getPasswordPolicyMessage(locale);
  }

  if (!/[a-z]/.test(password)) {
    return getPasswordPolicyMessage(locale);
  }

  if (!/[A-Z]/.test(password)) {
    return getPasswordPolicyMessage(locale);
  }

  if (!/\d/.test(password)) {
    return getPasswordPolicyMessage(locale);
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return getPasswordPolicyMessage(locale);
  }

  return null;
}

export function getPasswordConfirmationError(locale: Locale) {
  return locale === "ar"
    ? "تأكد من تطابق كلمتي المرور قبل المتابعة."
    : "Make sure both password fields match before continuing.";
}

export function getPasswordConfirmationRequiredError(locale: Locale) {
  return locale === "ar"
    ? "أكد كلمة المرور قبل المتابعة."
    : "Confirm your password before continuing.";
}
