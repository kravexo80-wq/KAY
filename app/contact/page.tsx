import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Contact"
        title="Luxury retail tone, direct support structure."
        description="The contact surface is designed for concierge support, wholesale inquiry, press requests, and future customer service integration."
        note="This form is presentation-only for now. It is ready to connect to Supabase, email workflows, or a support platform later."
      />

      <section className="section-frame grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <form className="luxury-panel space-y-4 p-6 md:p-8">
          <Input placeholder="Full name" />
          <Input type="email" placeholder="Email address" />
          <Input placeholder="Subject" />
          <textarea
            className="min-h-40 w-full rounded-[1.75rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-300 focus-visible:border-white/20 focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="How can Kravexo assist?"
          />
          <Button type="submit" className="w-full sm:w-auto">
            Send inquiry
          </Button>
        </form>

        <div className="grid gap-4">
          <div className="luxury-muted-panel p-5">
            <p className="eyebrow">Concierge</p>
            <p className="mt-3 text-lg text-white">{siteConfig.supportEmail}</p>
            <p className="mt-2 text-sm leading-7 text-white/56">
              High-touch support for sizing, styling, launch access, and private
              purchase inquiries.
            </p>
          </div>
          <div className="luxury-muted-panel p-5">
            <p className="eyebrow">Studio</p>
            <p className="mt-3 text-lg text-white">{siteConfig.location}</p>
            <p className="mt-2 text-sm leading-7 text-white/56">
              Prepared for future showroom appointments, fittings, and campaign
              production notes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
