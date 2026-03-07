import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-300 focus-visible:border-white/20 focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  );
}
