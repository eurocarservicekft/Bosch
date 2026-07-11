import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2.5 rounded-md font-semibold text-base min-h-[48px] px-[22px] py-3.5 transition-[transform,background,border-color] duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:opacity-60 disabled:pointer-events-none [&_svg]:w-[18px] [&_svg]:h-[18px]",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-white border-accent hover:bg-accent-soft hover:-translate-y-0.5",
        ghost:
          "bg-transparent text-ink border-accent hover:bg-accent/10 hover:-translate-y-0.5",
      },
    },
    defaultVariants: { variant: "primary" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
