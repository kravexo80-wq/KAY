import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const adminSelectClassName =
  "h-12 w-full rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition focus:border-[#b79d67]/35";

export function AdminEditorField({
  isRtl = false,
  label,
  hint,
  children,
}: {
  isRtl?: boolean;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block space-y-3 ${isRtl ? "text-right" : "text-left"}`}>
      <div className="space-y-2">
        <span
          className={
            isRtl
              ? "text-sm font-medium tracking-[0.06em] text-white/58"
              : "text-[0.68rem] uppercase tracking-[0.24em] text-white/36"
          }
        >
          {label}
        </span>
        {hint ? <p className="text-sm leading-6 text-white/44">{hint}</p> : null}
      </div>
      {children}
    </label>
  );
}

export function AdminEditorCheckboxField({
  isRtl = false,
  name,
  label,
  hint,
  defaultChecked,
}: {
  isRtl?: boolean;
  name: string;
  label: string;
  hint: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="rounded-[1.3rem] border border-white/8 bg-white/[0.03] p-4">
      <div
        className={`flex items-start gap-3 ${isRtl ? "flex-row-reverse text-right" : ""}`}
      >
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="mt-1 h-4 w-4 rounded border-white/12 bg-transparent accent-[#b79d67]"
        />
        <div>
          <p
            className={
              isRtl
                ? "text-base font-medium text-white/78"
                : "text-sm uppercase tracking-[0.22em] text-white/72"
            }
          >
            {label}
          </p>
          <p className="mt-2 text-sm leading-7 text-white/48">{hint}</p>
        </div>
      </div>
    </label>
  );
}

export function AdminEditorSectionHeading({
  title,
  description,
  isRtl = false,
}: {
  title: string;
  description?: string;
  isRtl?: boolean;
}) {
  return (
    <div className={`space-y-3 ${isRtl ? "text-right" : "text-left"}`}>
      <h2
        className={
          isRtl
            ? "text-[1.8rem] leading-tight text-white md:text-[2.35rem]"
            : "text-[1.55rem] leading-none text-white md:text-[2rem]"
        }
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-7 text-white/48">{description}</p>
      ) : null}
    </div>
  );
}

export function AdminEditorSurface({
  children,
  tone = "panel",
  className,
}: {
  children: ReactNode;
  tone?: "panel" | "elevated" | "muted";
  className?: string;
}) {
  const toneClassName = {
    panel: "showroom-panel",
    elevated: "luxury-panel",
    muted: "luxury-muted-panel",
  }[tone];

  return <section className={cn(toneClassName, "p-6 md:p-8", className)}>{children}</section>;
}

export function AdminEditorLocalePill({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.24em] text-white/46",
        className,
      )}
    >
      {label}
    </span>
  );
}

export function AdminEditorToggleTile({
  name,
  label,
  hint,
  defaultChecked,
  isRtl = false,
}: {
  name: string;
  label: string;
  hint?: string;
  defaultChecked?: boolean;
  isRtl?: boolean;
}) {
  return (
    <label className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 transition hover:border-white/14">
      <div
        className={cn(
          "flex items-start justify-between gap-4",
          isRtl && "flex-row-reverse text-right",
        )}
      >
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.22em] text-white/72">{label}</p>
          {hint ? <p className="text-sm leading-6 text-white/42">{hint}</p> : null}
        </div>
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="mt-1 h-4 w-4 shrink-0 rounded border-white/12 bg-transparent accent-[#b79d67]"
        />
      </div>
    </label>
  );
}

export function AdminEditorMetaRow({
  label,
  value,
  isRtl = false,
}: {
  label: string;
  value: ReactNode;
  isRtl?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-[1.2rem] border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-white/56",
        isRtl && "flex-row-reverse text-right",
      )}
    >
      <span>{label}</span>
      <span className="text-white/76">{value}</span>
    </div>
  );
}
