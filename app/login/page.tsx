import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const user = await getCurrentUser();
  const { error, message, next } = await searchParams;
  const nextPath = getSafeRedirectPath(next, "/account");
  const signupHref =
    nextPath === "/account"
      ? "/signup"
      : `/signup?next=${encodeURIComponent(nextPath)}`;

  if (user) {
    redirect(nextPath);
  }

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Login"
        title="A private entry point into the Kravexo showroom."
        description="Sign in with your Supabase-backed account to access protected profile pages, session-aware navigation, and future customer-only functionality."
        note="The luxury visual language stays intact while the auth flow is now real."
      />

      <section className="section-frame">
        <form
          action={loginAction}
          className="mx-auto max-w-xl luxury-panel space-y-5 p-6 md:p-8"
        >
          {error ? (
            <div className="luxury-muted-panel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">Sign-in issue</p>
              <p className="mt-3">{error}</p>
            </div>
          ) : null}

          {message ? (
            <div className="showroom-subpanel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">Account update</p>
              <p className="mt-3">{message}</p>
            </div>
          ) : null}

          <input type="hidden" name="next" value={nextPath} />

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-white/38">
              Email address
            </p>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] text-white/38">
              Password
            </p>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>

          <p className="text-center text-sm text-white/46">
            New to Kravexo?{" "}
            <Link href={signupHref} className="text-white transition hover:text-primary">
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
