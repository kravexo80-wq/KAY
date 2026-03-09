import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import {
  getPasswordPolicyTitle,
  passwordPolicy,
} from "@/lib/supabase/password-policy";
import { getCurrentUser, getSafeRedirectPath } from "@/lib/supabase/auth";
import { signupAction } from "@/lib/supabase/auth-actions";

export const metadata: Metadata = {
  title: "Signup",
};

type SignupPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    next?: string;
  }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const [{ locale, direction, dictionary }, user, resolvedSearchParams] =
    await Promise.all([getRequestI18n(), getCurrentUser(), searchParams]);
  const isRtl = direction === "rtl";
  const { error, message, next } = resolvedSearchParams;
  const nextPath = getSafeRedirectPath(next, "/account");
  const loginHref =
    nextPath === "/account"
      ? localizeHref(locale, "/login")
      : localizeHref(locale, `/login?next=${encodeURIComponent(nextPath)}`);
  const passwordTitle = getPasswordPolicyTitle(locale);

  if (user) {
    redirect(nextPath);
  }

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={dictionary.auth.signup.eyebrow}
        title={dictionary.auth.signup.title}
        description={dictionary.auth.signup.description}
        note={dictionary.auth.signup.note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
      />

      <section className="section-frame">
        <form
          action={signupAction}
          className={`mx-auto max-w-xl luxury-panel space-y-5 p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}
        >
          {error ? (
            <div className="luxury-muted-panel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">{dictionary.auth.signup.issueTitle}</p>
              <p className="mt-3">{error}</p>
            </div>
          ) : null}

          {message ? (
            <div className="showroom-subpanel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">{dictionary.auth.signup.updateTitle}</p>
              <p className="mt-3">{message}</p>
            </div>
          ) : null}

          <input type="hidden" name="next" value={nextPath} />
          <input type="hidden" name="locale" value={locale} />

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-white/38">
              {dictionary.auth.signup.fullName}
            </p>
            <Input
              name="fullName"
              placeholder={dictionary.auth.signup.fullName}
              autoComplete="name"
              required
              className="text-start"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-white/38">
              {dictionary.auth.signup.email}
            </p>
            <Input
              type="email"
              name="email"
              placeholder={dictionary.auth.signup.email}
              autoComplete="email"
              required
              className="text-start"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-white/38">
              {dictionary.auth.signup.password}
            </p>
            <Input
              type="password"
              name="password"
              placeholder={dictionary.auth.signup.passwordPlaceholder}
              autoComplete="new-password"
              required
              minLength={passwordPolicy.minLength}
              maxLength={passwordPolicy.maxLength}
              pattern={passwordPolicy.htmlPattern}
              title={passwordTitle}
              className="text-start"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-white/38">
              {dictionary.auth.signup.confirmPassword}
            </p>
            <Input
              type="password"
              name="confirmPassword"
              placeholder={dictionary.auth.signup.confirmPasswordPlaceholder}
              autoComplete="new-password"
              required
              minLength={passwordPolicy.minLength}
              maxLength={passwordPolicy.maxLength}
              pattern={passwordPolicy.htmlPattern}
              title={passwordTitle}
              className="text-start"
            />
          </div>

          <div className="showroom-subpanel p-4">
            <p className="eyebrow">{dictionary.auth.signup.passwordRulesTitle}</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-white/58">
              {dictionary.auth.signup.passwordRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>

          <Button type="submit" className="w-full">
            {dictionary.auth.signup.submit}
          </Button>

          <p className="text-center text-sm text-white/46">
            {dictionary.auth.signup.switchLead}{" "}
            <Link href={loginHref} className="text-white transition hover:text-primary">
              {dictionary.auth.signup.switchCta}
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
