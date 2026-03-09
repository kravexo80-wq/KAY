import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { requestPasswordResetAction } from "@/lib/supabase/auth-actions";

export const metadata: Metadata = {
  title: "Reset Password",
};

type ForgotPasswordPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const [{ locale, direction, dictionary }, resolvedSearchParams] = await Promise.all([
    getRequestI18n(),
    searchParams,
  ]);
  const isRtl = direction === "rtl";
  const { error, message } = resolvedSearchParams;

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={dictionary.auth.forgotPassword.eyebrow}
        title={dictionary.auth.forgotPassword.title}
        description={dictionary.auth.forgotPassword.description}
        note={dictionary.auth.forgotPassword.note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
      />

      <section className="section-frame">
        <form
          action={requestPasswordResetAction}
          className={`mx-auto max-w-xl luxury-panel space-y-5 p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}
        >
          {error ? (
            <div className="luxury-muted-panel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">{dictionary.auth.forgotPassword.issueTitle}</p>
              <p className="mt-3">{error}</p>
            </div>
          ) : null}

          {message ? (
            <div className="showroom-subpanel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">{dictionary.auth.forgotPassword.updateTitle}</p>
              <p className="mt-3">{message}</p>
            </div>
          ) : null}

          <input type="hidden" name="locale" value={locale} />

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-white/38">
              {dictionary.auth.forgotPassword.email}
            </p>
            <Input
              type="email"
              name="email"
              placeholder={dictionary.auth.forgotPassword.email}
              autoComplete="email"
              required
              className="text-start"
            />
          </div>

          <Button type="submit" className="w-full">
            {dictionary.auth.forgotPassword.submit}
          </Button>

          <p className="text-center text-sm text-white/46">
            {dictionary.auth.forgotPassword.switchLead}{" "}
            <Link
              href={localizeHref(locale, "/login")}
              className="text-white transition hover:text-primary"
            >
              {dictionary.auth.forgotPassword.switchCta}
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
