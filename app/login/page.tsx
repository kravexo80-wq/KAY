import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { getCurrentUser, getSafeRedirectPath } from "@/lib/supabase/auth";
import { loginAction } from "@/lib/supabase/auth-actions";

export const metadata: Metadata = {
  title: "Login",
};

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    next?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const [{ locale, direction, dictionary }, user, resolvedSearchParams] =
    await Promise.all([getRequestI18n(), getCurrentUser(), searchParams]);
  const isRtl = direction === "rtl";
  const { error, message, next } = resolvedSearchParams;
  const nextPath = getSafeRedirectPath(next, "/account");
  const signupHref =
    nextPath === "/account"
      ? localizeHref(locale, "/signup")
      : localizeHref(locale, `/signup?next=${encodeURIComponent(nextPath)}`);
  const forgotPasswordHref = localizeHref(locale, "/forgot-password");

  if (user) {
    redirect(nextPath);
  }

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={dictionary.auth.login.eyebrow}
        title={dictionary.auth.login.title}
        description={dictionary.auth.login.description}
        note={dictionary.auth.login.note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
      />

      <section className="section-frame">
        <form
          action={loginAction}
          className={`mx-auto max-w-xl luxury-panel space-y-5 p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}
        >
          {error ? (
            <div className="luxury-muted-panel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">{dictionary.auth.login.issueTitle}</p>
              <p className="mt-3">{error}</p>
            </div>
          ) : null}

          {message ? (
            <div className="showroom-subpanel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">{dictionary.auth.login.updateTitle}</p>
              <p className="mt-3">{message}</p>
            </div>
          ) : null}

          <input type="hidden" name="next" value={nextPath} />
          <input type="hidden" name="locale" value={locale} />

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-white/38">
              {dictionary.auth.login.email}
            </p>
            <Input
              type="email"
              name="email"
              placeholder={dictionary.auth.login.email}
              autoComplete="email"
              required
              className="text-start"
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-white/38">
              {dictionary.auth.login.password}
            </p>
            <Input
              type="password"
              name="password"
              placeholder={dictionary.auth.login.password}
              autoComplete="current-password"
              required
              className="text-start"
            />
            <div className={`${isRtl ? "text-left" : "text-right"}`}>
              <Link
                href={forgotPasswordHref}
                className="text-xs text-white/52 transition hover:text-white"
              >
                {dictionary.auth.login.forgotPassword}
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {dictionary.auth.login.submit}
          </Button>

          <p className="text-center text-sm text-white/46">
            {dictionary.auth.login.switchLead}{" "}
            <Link href={signupHref} className="text-white transition hover:text-primary">
              {dictionary.auth.login.switchCta}
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
