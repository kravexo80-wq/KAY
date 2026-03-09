import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { CatalogStatePanel } from "@/components/storefront/catalog-state-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import {
  getPasswordPolicyTitle,
  passwordPolicy,
} from "@/lib/supabase/password-policy";
import { getCurrentUser } from "@/lib/supabase/auth";
import { updatePasswordAction } from "@/lib/supabase/auth-actions";

export const metadata: Metadata = {
  title: "Create New Password",
};

type ResetPasswordPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const [{ locale, direction, dictionary }, user, resolvedSearchParams] =
    await Promise.all([getRequestI18n(), getCurrentUser(), searchParams]);
  const isRtl = direction === "rtl";
  const { error, message } = resolvedSearchParams;
  const passwordTitle = getPasswordPolicyTitle(locale);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={dictionary.auth.resetPassword.eyebrow}
        title={dictionary.auth.resetPassword.title}
        description={dictionary.auth.resetPassword.description}
        note={dictionary.auth.resetPassword.note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
      />

      {!user ? (
        <section className="section-frame">
          <CatalogStatePanel
            eyebrow={dictionary.auth.resetPassword.stateEyebrow}
            title={dictionary.auth.resetPassword.stateTitle}
            description={dictionary.auth.resetPassword.stateDescription}
            action={
              <Button asChild>
                <Link href={localizeHref(locale, "/forgot-password")}>
                  {dictionary.auth.resetPassword.requestAnother}
                </Link>
              </Button>
            }
          />
        </section>
      ) : (
        <section className="section-frame">
          <form
            action={updatePasswordAction}
            className={`mx-auto max-w-xl luxury-panel space-y-5 p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}
          >
            {error ? (
              <div className="luxury-muted-panel p-4 text-sm leading-7 text-white/62">
                <p className="eyebrow">{dictionary.auth.resetPassword.issueTitle}</p>
                <p className="mt-3">{error}</p>
              </div>
            ) : null}

            {message ? (
              <div className="showroom-subpanel p-4 text-sm leading-7 text-white/62">
                <p className="eyebrow">{dictionary.auth.resetPassword.updateTitle}</p>
                <p className="mt-3">{message}</p>
              </div>
            ) : null}

            <input type="hidden" name="locale" value={locale} />

            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.24em] text-white/38">
                {dictionary.auth.resetPassword.password}
              </p>
              <Input
                type="password"
                name="password"
                placeholder={dictionary.auth.resetPassword.passwordPlaceholder}
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
                {dictionary.auth.resetPassword.confirmPassword}
              </p>
              <Input
                type="password"
                name="confirmPassword"
                placeholder={dictionary.auth.resetPassword.confirmPasswordPlaceholder}
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
              {dictionary.auth.resetPassword.submit}
            </Button>
          </form>
        </section>
      )}
    </div>
  );
}
