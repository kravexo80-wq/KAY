import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Login"
        title="A premium entry point for future account flows."
        description="The login page is intentionally simple and spacious, ready for Supabase Auth, social providers, and protected account routes."
        note="Authentication is not wired yet. This page establishes the visual language and structure only."
      />

      <section className="section-frame">
        <div className="mx-auto max-w-xl luxury-panel space-y-4 p-6 md:p-8">
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Sign in</Button>
          <p className="text-center text-sm text-white/46">
            New to Kravexo?{" "}
            <Link href="/signup" className="text-white transition hover:text-primary">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
