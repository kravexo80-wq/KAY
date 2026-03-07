import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { OrderListCard } from "@/components/storefront/order-list-card";
import { Button } from "@/components/ui/button";
import { getProfileDisplayName, requireAuth } from "@/lib/supabase/auth";
import { getRecentOrdersForCurrentUser } from "@/lib/supabase/orders";

export const metadata: Metadata = {
  title: "Account",
};

type AccountPageProps = {
  searchParams: Promise<{
    denied?: string;
  }>;
};

export default async function AccountPage({
  searchParams,
}: AccountPageProps) {
  const [{ user, profile }, recentOrders, resolvedSearchParams] = await Promise.all([
    requireAuth("/account"),
    getRecentOrdersForCurrentUser(4),
    searchParams,
  ]);
  const deniedAdminAccess = resolvedSearchParams.denied === "admin";
  const displayName = getProfileDisplayName(profile, user.email);
  const memberSince = profile
    ? new Intl.DateTimeFormat("en-GB", {
        month: "short",
        year: "numeric",
      }).format(new Date(profile.created_at))
    : "Pending";
  const accountStats = [
    { label: "Role", value: profile?.role === "admin" ? "Admin" : "Customer" },
    { label: "Session", value: "Active" },
    { label: "Member since", value: memberSince },
  ];

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Account"
        title={`Welcome back, ${displayName}.`}
        description="This page is now auth-protected and loads the real signed-in Supabase user together with the linked profile record."
        note={
          deniedAdminAccess
            ? "Admin access is restricted to Kravexo profiles with the admin role."
            : "Recent orders now land in Supabase after Stripe checkout, and this protected account view is ready for fuller order history and address management next."
        }
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
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Profile details</p>
              <h2 className="mt-4 text-4xl leading-none text-white">
                {displayName}
              </h2>
            </div>
            {profile?.role === "admin" ? (
              <Button asChild variant="secondary">
                <Link href="/admin">Open admin dashboard</Link>
              </Button>
            ) : null}
          </div>

          <div className="mt-5 space-y-5 text-sm text-white/58">
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
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>Display name</span>
              <span className="text-white/74">
                {profile?.display_name ?? "Not set yet"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>First name</span>
              <span className="text-white/74">
                {profile?.first_name ?? "Not set yet"}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>Last name</span>
              <span className="text-white/74">
                {profile?.last_name ?? "Not set yet"}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-frame">
        <div className="showroom-panel p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">Recent orders</p>
              <h2 className="mt-4 text-4xl leading-none text-white">
                Stripe-backed order records are now live.
              </h2>
            </div>
            <Button asChild variant="secondary">
              <Link href="/account/orders">View full history</Link>
            </Button>
          </div>

          {recentOrders.length > 0 ? (
            <div className="mt-6 grid gap-4">
              {recentOrders.map((order) => (
                <OrderListCard
                  key={order.id}
                  order={order}
                  href={`/account/orders/${order.id}`}
                  contextLabel="Recent order"
                />
              ))}
            </div>
          ) : (
            <div className="showroom-subpanel mt-6 p-5">
              <p className="text-sm leading-7 text-white/58">
                No Stripe-backed orders have been recorded for this account yet.
                Once a checkout succeeds, recent orders will appear here without
                any further UI restructuring.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
