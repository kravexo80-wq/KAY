import * as React from "react";

import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-300 focus-visible:border-white/20 focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}
