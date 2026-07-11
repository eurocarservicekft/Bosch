import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full rounded-lg bg-background border border-border text-ink text-base px-3.5 py-3 transition-colors placeholder:text-muted/70 focus:outline-none focus:border-accent",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";
export { Input };
