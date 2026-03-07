import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const metrics = [
  { label: "Products", value: "06" },
  { label: "Collections", value: "03" },
  { label: "Subscribers", value: "218" },
  { label: "Pending tasks", value: "09" },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Admin Dashboard"
        title="Operational scaffolding for the store’s next build phase."
        description="The admin surface is placeholder-only for now, but it gives the project a dedicated space for catalog management, customer oversight, and reporting."
        note="Authentication, protected routing, inventory actions, and payment visibility are intentionally not implemented yet."
      />

      <section className="section-frame space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="luxury-muted-panel p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/38">
                {metric.label}
              </p>
              <p className="mt-3 text-4xl leading-none text-white">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="luxury-panel p-6 md:p-8">
            <p className="eyebrow">Launch tasks</p>
            <div className="mt-5 space-y-4 text-sm text-white/58">
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                Finalize Supabase schema for products, collections, and users.
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                Connect Stripe checkout, webhook handling, and order status flow.
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                Replace placeholder gallery frames with production photography.
              </div>
            </div>
          </div>

          <div className="luxury-muted-panel p-5">
            <p className="eyebrow">Current state</p>
            <p className="mt-3 text-sm leading-7 text-white/56">
              Project structure, luxury visual system, and route scaffolding are
              ready. Commerce and data operations come next.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
