import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { getProfileDisplayName, requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  const { user, profile } = await requireAdmin("/admin");
  const metrics = [
    { label: "Access", value: "Granted" },
    { label: "Role", value: "Admin" },
    { label: "Profile", value: profile ? "Synced" : "Pending" },
    { label: "Catalog", value: "Live" },
  ];
  const displayName = getProfileDisplayName(profile, user.email);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Admin Dashboard"
        title="Operational access confirmed for the Kravexo admin surface."
        description="This route is now protected by Supabase Auth and the profiles.role guard, so only authenticated administrators can reach it."
        note="Catalog management, order oversight, and reporting can now build on top of a real admin access boundary."
        actions={
          <>
            <Button asChild>
              <Link href="/admin/products">Manage products</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin/orders">Review orders</Link>
            </Button>
          </>
        }
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
            <p className="eyebrow">Admin identity</p>
            <div className="mt-5 space-y-4 text-sm text-white/58">
              <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <span>Administrator</span>
                <span className="text-white/74">{displayName}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <span>Email address</span>
                <span className="text-white/74">{user.email ?? "Unavailable"}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <span>Profile role</span>
                <span className="text-white/74">
                  {profile?.role === "admin" ? "Administrator" : "Customer"}
                </span>
              </div>
            </div>
          </div>

          <div className="luxury-muted-panel p-5">
            <p className="eyebrow">Current state</p>
            <p className="mt-3 text-sm leading-7 text-white/56">
              Authentication, protected routing, live catalog reads, and role
              checks are now active. Product management and order oversight now
              continue in dedicated admin surfaces.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link href="/admin/products">Open admin products</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/admin/orders">Open admin orders</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
