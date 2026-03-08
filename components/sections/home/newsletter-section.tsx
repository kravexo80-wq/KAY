import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface NewsletterSectionProps {
  copy: Dictionary["home"]["newsletter"];
  isRtl?: boolean;
}

export function NewsletterSection({
  copy,
  isRtl = false,
}: NewsletterSectionProps) {
  return (
    <section className="section-frame section-space">
      <div className="showroom-panel px-6 py-8 md:px-10 md:py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[18%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(190,169,124,0.2),transparent_72%)] blur-3xl" />
          <div className="absolute right-[10%] top-[12%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_72%)] blur-3xl" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center">
          <div className={`relative space-y-5 ${isRtl ? "text-right" : "text-left"}`}>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="max-w-2xl text-4xl leading-none text-white md:text-6xl">
              {copy.title}
            </h2>
            <p className="max-w-xl text-base leading-7 text-white/62">
              {copy.description}
            </p>
            <div className={`flex flex-wrap gap-2 ${isRtl ? "justify-end" : ""}`}>
              {copy.tags.map((item: string) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-white/46"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <form className={`showroom-subpanel relative space-y-4 p-5 md:p-6 ${isRtl ? "text-right" : "text-left"}`}>
            <div>
              <p className="eyebrow">{copy.formTitle}</p>
              <p className="mt-3 text-sm leading-7 text-white/54">
                {copy.formDescription}
              </p>
            </div>
            <Input
              type="email"
              placeholder={copy.emailPlaceholder}
              className="h-[3.35rem] rounded-[1.15rem] bg-white/[0.05] px-5 text-start"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder={copy.interestPlaceholder}
                className="h-[3.35rem] rounded-[1.15rem] bg-white/[0.05] px-5 text-start"
              />
              <Button type="submit" className="sm:min-w-44">
                {copy.submit}
              </Button>
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/34">
              {copy.footer}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
