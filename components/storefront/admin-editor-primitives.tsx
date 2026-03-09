import type { ReactNode } from "react";

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
