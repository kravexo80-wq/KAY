import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface CatalogStatePanelProps {
  title: string;
  description: string;
  eyebrow?: string;
  action?: ReactNode;
  className?: string;
}

export function CatalogStatePanel({
  title,
  description,
  eyebrow = "Catalog state",
  action,
  className,
}: CatalogStatePanelProps) {
  return (
    <div className={cn("showroom-subpanel p-6 md:p-7", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl leading-none text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58 md:text-base">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
