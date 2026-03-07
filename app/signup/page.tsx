import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const user = await getCurrentUser();
  const { error, message, next } = await searchParams;
  const nextPath = getSafeRedirectPath(next, "/account");
  const loginHref =
    nextPath === "/account"
      ? "/login"
      : `/login?next=${encodeURIComponent(nextPath)}`;

  if (user) {
    redirect(nextPath);
  }

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Signup"
        title="Create a Kravexo account for protected access."
        description="Account creation now uses Supabase Auth and prepares the linked profile record used for protected customer and admin access."
        note="The page keeps the same refined visual rhythm while the underlying signup flow is now real."
      />

      <section className="section-frame">
        <form
          action={signupAction}
          className="mx-auto max-w-xl luxury-panel space-y-5 p-6 md:p-8"
        >
          {error ? (
            <div className="luxury-muted-panel p-4 text-sm leading-7 text-white/62">
              <p className="eyebrow">Signup issue</p>
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
              Full name
            </p>
            <Input
              name="fullName"
              placeholder="Full name"
              autoComplete="name"
              required
            />
          </div>

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
              placeholder="Create password"
              autoComplete="new-password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Create account
          </Button>

          <p className="text-center text-sm text-white/46">
            Already registered?{" "}
            <Link href={loginHref} className="text-white transition hover:text-primary">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
