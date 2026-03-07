import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="section-frame section-space">
      <div className="luxury-panel overflow-hidden px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="space-y-4">
            <p className="eyebrow">Private list</p>
            <h2 className="max-w-2xl text-4xl leading-none text-white md:text-6xl">
              Reserve first access to launches, edits, and private releases.
            </h2>
            <p className="max-w-xl text-base leading-7 text-white/62">
              Placeholder capture for the future CRM flow. The layout is ready
              for Supabase-backed newsletter storage and segmented launch
              communication.
            </p>
          </div>

          <form className="space-y-4">
            <Input type="email" placeholder="Email address" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input placeholder="Preferred collection" />
              <Button type="submit" className="sm:min-w-44">
                Join the list
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
