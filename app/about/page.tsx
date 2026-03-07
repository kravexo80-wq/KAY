import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";

export const metadata: Metadata = {
  title: "About",
};

const values = [
  {
    title: "Product-first staging",
    description:
      "Layouts are built to isolate the garment and let proportion, surface, and tailoring dominate the frame.",
  },
  {
    title: "Modest, modern silhouettes",
    description:
      "The brand language stays culturally grounded while presenting modest fashion through a highly refined retail lens.",
  },
  {
    title: "Premium restraint",
    description:
      "Nothing is loud. Contrast, finish, and spacing carry the sense of luxury instead of decorative excess.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="About Kravexo"
        title="A premium modest wear brand built around shadow, craft, and control."
        description="Kravexo aims to feel less like a conventional store and more like a private showroom, where every release is treated as a hero object."
        note="This placeholder brand page is ready for future editorial photography, founder story, atelier process, and campaign video modules."
      />

      <section className="section-frame grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="luxury-panel p-6 md:p-8">
          <p className="eyebrow">Brand point of view</p>
          <div className="mt-4 space-y-5 text-base leading-8 text-white/62">
            <p>
              Kravexo blends contemporary luxury retail direction with modest
              fashion codes rooted in elegance, restraint, and ceremonial
              presence.
            </p>
            <p>
              The storefront is intentionally dark and spacious so the product
              appears illuminated, central, and expensive. The goal is to make
              even a simple silhouette feel like a carefully staged statement.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {values.map((value) => (
            <div key={value.title} className="luxury-muted-panel p-5">
              <h2 className="text-2xl leading-none text-white">{value.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/56">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
