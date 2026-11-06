import React from "react";
import { cn } from "@/lib/utils";

export interface ShimmerTextProps {
  text: string;
  className?: string;
}

export function ShimmerText({ text, className }: ShimmerTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer",
        className
      )}
      style={{
        animation: "shimmer 2.5s linear infinite",
      }}
    >
      {text}
    </span>
  );
}

export default ShimmerText;
