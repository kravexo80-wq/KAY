import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { OrderListCard } from "@/components/storefront/order-list-card";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
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
  const [
    { locale, direction, dictionary },
    { user, profile },
    recentOrders,
    resolvedSearchParams,
  ] = await Promise.all([
    getRequestI18n(),
    requireAuth("/account"),
    getRecentOrdersForCurrentUser(4),
    searchParams,
  ]);
  const isRtl = direction === "rtl";
  const deniedAdminAccess = resolvedSearchParams.denied === "admin";
  const displayName = getProfileDisplayName(profile, user.email);
  const memberSince = profile
    ? new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
        month: "short",
        year: "numeric",
      }).format(new Date(profile.created_at))
    : dictionary.account.pending;
  const accountStats = [
    {
      label: dictionary.account.profileRole,
      value:
        profile?.role === "admin"
          ? dictionary.account.roleAdmin
          : dictionary.account.roleCustomer,
    },
    { label: dictionary.account.session, value: dictionary.account.active },
    { label: dictionary.account.memberSince, value: memberSince },
  ];

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={dictionary.account.eyebrow}
        title={
          locale === "ar" ? `مرحباً بعودتك، ${displayName}.` : `Welcome back, ${displayName}.`
        }
        description={dictionary.account.description}
        note={
          deniedAdminAccess
            ? dictionary.account.deniedNote
            : dictionary.account.defaultNote
        }
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
      />

      <section className="section-frame grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="grid gap-4">
          {accountStats.map((stat) => (
            <div key={stat.label} className={`luxury-muted-panel p-5 ${isRtl ? "text-right" : "text-left"}`}>
              <p className="text-xs uppercase tracking-[0.24em] text-white/38">
                {stat.label}
              </p>
              <p className="mt-3 text-4xl leading-none text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className={`luxury-panel p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">{dictionary.account.profileDetails}</p>
              <h2 className="mt-4 text-4xl leading-none text-white">{displayName}</h2>
            </div>
            {profile?.role === "admin" ? (
              <Button asChild variant="secondary">
                <Link href={localizeHref(locale, "/admin")}>
                  {dictionary.account.openAdmin}
                </Link>
              </Button>
            ) : null}
          </div>

          <div className="mt-5 space-y-5 text-sm text-white/58">
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>{dictionary.account.email}</span>
              <span className="text-white/74">{user.email ?? dictionary.account.pending}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>{dictionary.account.profileRole}</span>
              <span className="text-white/74">
                {profile?.role === "admin"
                  ? dictionary.admin.administrator
                  : dictionary.account.roleCustomer}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>{dictionary.account.displayName}</span>
              <span className="text-white/74">
                {profile?.display_name ?? dictionary.account.notSet}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>{dictionary.account.firstName}</span>
              <span className="text-white/74">
                {profile?.first_name ?? dictionary.account.notSet}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
              <span>{dictionary.account.lastName}</span>
              <span className="text-white/74">
                {profile?.last_name ?? dictionary.account.notSet}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-frame">
        <div className={`showroom-panel p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow">{dictionary.account.recentOrders}</p>
              <h2 className="mt-4 text-4xl leading-none text-white">
                {dictionary.account.recentOrdersTitle}
              </h2>
            </div>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/account/orders")}>
                {dictionary.account.viewHistory}
              </Link>
            </Button>
          </div>

          {recentOrders.length > 0 ? (
            <div className="mt-6 grid gap-4">
              {recentOrders.map((order) => (
                <OrderListCard
                  key={order.id}
                  order={order}
                  href={localizeHref(locale, `/account/orders/${order.id}`)}
                  locale={locale}
                  contextLabel={dictionary.account.recentOrderContext}
                />
              ))}
            </div>
          ) : (
            <div className="showroom-subpanel mt-6 p-5">
              <p className="text-sm leading-7 text-white/58">
                {dictionary.account.emptyOrders}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
