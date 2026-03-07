import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";

export const metadata: Metadata = {
  title: "Account",
};

const accountStats = [
  { label: "Orders", value: "04" },
  { label: "Saved pieces", value: "07" },
  { label: "Preferred size", value: "M" },
];

export default function AccountPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Account"
        title="A private dashboard for orders, sizing, and saved pieces."
        description="This placeholder account page gives the project a clear destination for auth-protected customer data without implementing the data layer yet."
        note="Order history, wishlist data, addresses, and profile state are deferred until Supabase and Stripe are connected."
      />

      <section className="section-frame grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="grid gap-4">
          {accountStats.map((stat) => (
            <div key={stat.label} className="luxury-muted-panel p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/38">
                {stat.label}
              </p>
              <p className="mt-3 text-4xl leading-none text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="luxury-panel p-6 md:p-8">
          <p className="eyebrow">Recent activity</p>
          <div className="mt-5 space-y-5 text-sm text-white/58">
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>Order KRX-2401 awaiting fulfillment</span>
              <span className="text-white/74">Processing</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>Saved Obsidian Thobe to wishlist</span>
              <span className="text-white/74">Saved</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>Preferred sizing profile updated</span>
              <span className="text-white/74">Updated</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
