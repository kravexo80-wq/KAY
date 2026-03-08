import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/layout/page-intro";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n/config";
import { getRequestI18n } from "@/lib/i18n/request";
import { getProfileDisplayName, requireAdmin } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  const [{ locale, direction, dictionary }, { user, profile }] = await Promise.all([
    getRequestI18n(),
    requireAdmin("/admin"),
  ]);
  const isRtl = direction === "rtl";
  const metrics = [
    {
      label: dictionary.admin.metrics.access,
      value: dictionary.admin.metrics.granted,
    },
    {
      label: dictionary.admin.metrics.role,
      value: dictionary.admin.metrics.admin,
    },
    {
      label: dictionary.admin.metrics.profile,
      value: profile ? dictionary.admin.metrics.synced : dictionary.account.pending,
    },
    {
      label: dictionary.admin.metrics.catalog,
      value: dictionary.admin.metrics.live,
    },
  ];
  const displayName = getProfileDisplayName(profile, user.email);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow={dictionary.admin.eyebrow}
        title={dictionary.admin.title}
        description={dictionary.admin.description}
        note={dictionary.admin.note}
        noteLabel={dictionary.common.showroomNote}
        isRtl={isRtl}
        actions={
          <>
            <Button asChild>
              <Link href={localizeHref(locale, "/admin/products")}>
                {dictionary.admin.manageProducts}
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href={localizeHref(locale, "/admin/orders")}>
                {dictionary.admin.reviewOrders}
              </Link>
            </Button>
          </>
        }
      />

      <section className="section-frame space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className={`luxury-muted-panel p-5 ${isRtl ? "text-right" : "text-left"}`}>
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
          <div className={`luxury-panel p-6 md:p-8 ${isRtl ? "text-right" : "text-left"}`}>
            <p className="eyebrow">{dictionary.admin.identity}</p>
            <div className="mt-5 space-y-4 text-sm text-white/58">
              <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <span>{dictionary.admin.administrator}</span>
                <span className="text-white/74">{displayName}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <span>{dictionary.admin.email}</span>
                <span className="text-white/74">{user.email ?? dictionary.account.pending}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-5 py-4">
                <span>{dictionary.admin.profileRole}</span>
                <span className="text-white/74">{dictionary.admin.administrator}</span>
              </div>
            </div>
          </div>

          <div className={`luxury-muted-panel p-5 ${isRtl ? "text-right" : "text-left"}`}>
            <p className="eyebrow">{dictionary.admin.currentState}</p>
            <p className="mt-3 text-sm leading-7 text-white/56">
              {dictionary.admin.currentStateBody}
            </p>
            <div className={`mt-5 flex flex-wrap gap-3 ${isRtl ? "justify-end" : ""}`}>
              <Button asChild variant="secondary">
                <Link href={localizeHref(locale, "/admin/products")}>
                  {dictionary.admin.openProducts}
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={localizeHref(locale, "/admin/orders")}>
                  {dictionary.admin.openOrders}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
