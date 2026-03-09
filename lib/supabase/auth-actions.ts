"use server";

import { redirect } from "next/navigation";

import { getSiteUrl } from "@/lib/config/site";
import {
  defaultLocale,
  isLocale,
  localizeHref,
  type Locale,
} from "@/lib/i18n/config";
import { getRequestLocale } from "@/lib/i18n/request";

import { getSafeRedirectPath } from "./auth";
import { hasSupabaseEnv } from "./config";
import {
  getPasswordConfirmationError,
  getPasswordConfirmationRequiredError,
  getPasswordValidationError,
} from "./password-policy";
import { createServerSupabaseClient } from "./server";

const AUTH_UNAVAILABLE_MESSAGE =
  "Authentication is not configured in this environment yet.";

function getFieldValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function getLocaleValue(formData: FormData): Locale {
  const value = formData.get("locale");

  return typeof value === "string" && isLocale(value) ? value : defaultLocale;
}

function buildRedirect(pathname: string, params: Record<string, string | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}

function buildLocalizedRedirect(
  locale: Locale,
  pathname: string,
  params: Record<string, string | undefined>,
) {
  return buildRedirect(localizeHref(locale, pathname), params);
}

function getPasswordResetRedirectUrl(locale: Locale) {
  const resetPath = localizeHref(locale, "/reset-password");
  const confirmPath = localizeHref(
    locale,
    `/auth/confirm?next=${encodeURIComponent(resetPath)}`,
  );

  return `${getSiteUrl()}${confirmPath}`;
}

function getMissingCredentialsMessage(locale: Locale) {
  return locale === "ar"
    ? "أدخل البريد الإلكتروني وكلمة المرور معاً."
    : "Enter both your email and password.";
}

function getIncompleteSignupMessage(locale: Locale) {
  return locale === "ar"
    ? "أكمل جميع الحقول قبل إنشاء الحساب."
    : "Complete all fields before creating your account.";
}

function getForgotPasswordEmailMessage(locale: Locale) {
  return locale === "ar"
    ? "أدخل بريدك الإلكتروني أولاً."
    : "Enter your email address first.";
}

function getResetLinkSentMessage(locale: Locale) {
  return locale === "ar"
    ? "إذا كان هذا البريد مرتبطاً بحساب، فستصلك رسالة لإعادة تعيين كلمة المرور خلال لحظات."
    : "If an account exists for this email address, a password reset link will arrive shortly.";
}

function getResetSessionMessage(locale: Locale) {
  return locale === "ar"
    ? "افتح رابط إعادة التعيين من بريدك الإلكتروني مرة أخرى للمتابعة."
    : "Open the reset link from your email again to continue.";
}

function getResetCompleteMessage(locale: Locale) {
  return locale === "ar"
    ? "تم تحديث كلمة المرور. يمكنك تسجيل الدخول الآن بكلمة المرور الجديدة."
    : "Your password has been updated. You can sign in now with the new password.";
}

function getLocalizedNextPath(locale: Locale, value: FormDataEntryValue | null) {
  const nextPath = getSafeRedirectPath(value, "/account");

  return localizeHref(locale, nextPath);
}

export async function loginAction(formData: FormData) {
  const locale = getLocaleValue(formData);
  const nextPath = getLocalizedNextPath(locale, formData.get("next"));
  const accountPath = localizeHref(locale, "/account");
  const email = getFieldValue(formData, "email");
  const password = getFieldValue(formData, "password");

  if (!hasSupabaseEnv()) {
    redirect(
      buildLocalizedRedirect(locale, "/login", {
        error: AUTH_UNAVAILABLE_MESSAGE,
        next: nextPath !== accountPath ? nextPath : undefined,
      }),
    );
  }

  if (!email || !password) {
    redirect(
      buildLocalizedRedirect(locale, "/login", {
        error: getMissingCredentialsMessage(locale),
        next: nextPath !== accountPath ? nextPath : undefined,
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(
      buildLocalizedRedirect(locale, "/login", {
        error: error.message,
        next: nextPath !== accountPath ? nextPath : undefined,
      }),
    );
  }

  redirect(nextPath);
}

export async function signupAction(formData: FormData) {
  const locale = getLocaleValue(formData);
  const nextPath = getLocalizedNextPath(locale, formData.get("next"));
  const accountPath = localizeHref(locale, "/account");
  const fullName = getFieldValue(formData, "fullName");
  const email = getFieldValue(formData, "email");
  const password = getFieldValue(formData, "password");
  const confirmPassword = getFieldValue(formData, "confirmPassword");
  const [firstName = "", ...remainingNames] = fullName.split(/\s+/).filter(Boolean);
  const lastName = remainingNames.join(" ");

  if (!hasSupabaseEnv()) {
    redirect(
      buildLocalizedRedirect(locale, "/signup", {
        error: AUTH_UNAVAILABLE_MESSAGE,
        next: nextPath !== accountPath ? nextPath : undefined,
      }),
    );
  }

  if (!fullName || !email || !password) {
    redirect(
      buildLocalizedRedirect(locale, "/signup", {
        error: getIncompleteSignupMessage(locale),
        next: nextPath !== accountPath ? nextPath : undefined,
      }),
    );
  }

  if (!confirmPassword) {
    redirect(
      buildLocalizedRedirect(locale, "/signup", {
        error: getPasswordConfirmationRequiredError(locale),
        next: nextPath !== accountPath ? nextPath : undefined,
      }),
    );
  }

  const passwordError = getPasswordValidationError(password, locale);

  if (passwordError) {
    redirect(
      buildLocalizedRedirect(locale, "/signup", {
        error: passwordError,
        next: nextPath !== accountPath ? nextPath : undefined,
      }),
    );
  }

  if (password !== confirmPassword) {
    redirect(
      buildLocalizedRedirect(locale, "/signup", {
        error: getPasswordConfirmationError(locale),
        next: nextPath !== accountPath ? nextPath : undefined,
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: fullName,
        full_name: fullName,
        first_name: firstName || null,
        last_name: lastName || null,
      },
    },
  });

  if (error) {
    redirect(
      buildLocalizedRedirect(locale, "/signup", {
        error: error.message,
        next: nextPath !== accountPath ? nextPath : undefined,
      }),
    );
  }

  if (!data.session) {
    redirect(
      buildLocalizedRedirect(locale, "/login", {
        message:
          locale === "ar"
            ? "تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد الدخول قبل المتابعة."
            : "Account created. Check your email to confirm the sign-in before continuing.",
        next: nextPath !== accountPath ? nextPath : undefined,
      }),
    );
  }

  redirect(nextPath);
}

export async function requestPasswordResetAction(formData: FormData) {
  const locale = getLocaleValue(formData);
  const email = getFieldValue(formData, "email");

  if (!hasSupabaseEnv()) {
    redirect(
      buildLocalizedRedirect(locale, "/forgot-password", {
        error: AUTH_UNAVAILABLE_MESSAGE,
      }),
    );
  }

  if (!email) {
    redirect(
      buildLocalizedRedirect(locale, "/forgot-password", {
        error: getForgotPasswordEmailMessage(locale),
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: getPasswordResetRedirectUrl(locale),
  });

  if (error) {
    redirect(
      buildLocalizedRedirect(locale, "/forgot-password", {
        error: error.message,
      }),
    );
  }

  redirect(
    buildLocalizedRedirect(locale, "/forgot-password", {
      message: getResetLinkSentMessage(locale),
    }),
  );
}

export async function updatePasswordAction(formData: FormData) {
  const locale = getLocaleValue(formData);
  const password = getFieldValue(formData, "password");
  const confirmPassword = getFieldValue(formData, "confirmPassword");

  if (!hasSupabaseEnv()) {
    redirect(
      buildLocalizedRedirect(locale, "/reset-password", {
        error: AUTH_UNAVAILABLE_MESSAGE,
      }),
    );
  }

  if (!password) {
    redirect(
      buildLocalizedRedirect(locale, "/reset-password", {
        error: getPasswordValidationError("", locale) ?? getResetSessionMessage(locale),
      }),
    );
  }

  if (!confirmPassword) {
    redirect(
      buildLocalizedRedirect(locale, "/reset-password", {
        error: getPasswordConfirmationRequiredError(locale),
      }),
    );
  }

  const passwordError = getPasswordValidationError(password, locale);

  if (passwordError) {
    redirect(
      buildLocalizedRedirect(locale, "/reset-password", {
        error: passwordError,
      }),
    );
  }

  if (password !== confirmPassword) {
    redirect(
      buildLocalizedRedirect(locale, "/reset-password", {
        error: getPasswordConfirmationError(locale),
      }),
    );
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect(
      buildLocalizedRedirect(locale, "/reset-password", {
        error: getResetSessionMessage(locale),
      }),
    );
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    redirect(
      buildLocalizedRedirect(locale, "/reset-password", {
        error: error.message,
      }),
    );
  }

  await supabase.auth.signOut();

  redirect(
    buildLocalizedRedirect(locale, "/login", {
      message: getResetCompleteMessage(locale),
    }),
  );
}

export async function logoutAction() {
  const locale = await getRequestLocale();

  if (!hasSupabaseEnv()) {
    redirect(localizeHref(locale, "/"));
  }

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();

  redirect(localizeHref(locale, "/"));
}
