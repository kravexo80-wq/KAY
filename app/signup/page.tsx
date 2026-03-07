import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Signup",
};

export default function SignupPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Signup"
        title="Structured for future customer accounts and launch access."
        description="This signup page sets the foundation for account creation, saved preferences, order history, and member-only releases."
        note="Later this can support Supabase Auth, invite-only drops, and profile onboarding without reshaping the UI."
      />

      <section className="section-frame">
        <div className="mx-auto max-w-xl luxury-panel space-y-4 p-6 md:p-8">
          <Input placeholder="Full name" />
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Create password" />
          <Button className="w-full">Create account</Button>
          <p className="text-center text-sm text-white/46">
            Already registered?{" "}
            <Link href="/login" className="text-white transition hover:text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
