import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="section-frame section-space">
      <div className="showroom-panel px-6 py-8 md:px-10 md:py-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-[18%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(190,169,124,0.2),transparent_72%)] blur-3xl" />
          <div className="absolute right-[10%] top-[12%] h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_72%)] blur-3xl" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:items-center">
          <div className="relative space-y-5">
            <p className="eyebrow">Private list</p>
            <h2 className="max-w-2xl text-4xl leading-none text-white md:text-6xl">
              Reserve first access to drops, edits, and private showroom
              releases.
            </h2>
            <p className="max-w-xl text-base leading-7 text-white/62">
              A premium opt-in surface prepared for future launch alerts,
              tailored communication, and invite-led releases without breaking
              the dark showroom tone.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Early access", "No noise", "Private drop alerts"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.68rem] uppercase tracking-[0.28em] text-white/46"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <form className="showroom-subpanel relative space-y-4 p-5 md:p-6">
            <div>
              <p className="eyebrow">Sign up</p>
              <p className="mt-3 text-sm leading-7 text-white/54">
                Simple now, ready for Supabase-backed CRM flows later.
              </p>
            </div>
            <Input
              type="email"
              placeholder="Email address"
              className="h-[3.35rem] rounded-[1.15rem] bg-white/[0.05] px-5"
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                placeholder="Preferred collection"
                className="h-[3.35rem] rounded-[1.15rem] bg-white/[0.05] px-5"
              />
              <Button type="submit" className="sm:min-w-44">
                Join the list
              </Button>
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/34">
              Campaign access, launch alerts, and collection previews
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
