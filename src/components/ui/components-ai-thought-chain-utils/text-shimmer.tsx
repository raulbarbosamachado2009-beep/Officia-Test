import React from "react";
import { cn } from "@/lib/utils";

export function ShimmerText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-neutral-400 via-neutral-900 to-neutral-400 dark:from-neutral-500 dark:via-white dark:to-neutral-500 bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_2s_infinite]",
        className
      )}
    >
      {text}
    </span>
  );
}
