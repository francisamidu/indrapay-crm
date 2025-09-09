import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border border-black/20 bg-gradient-to-b bg-primary text-white shadow-[0_4px_16px_rgba(20,184,166,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_6px_20px_rgba(20,184,166,0.2),inset_0_1px_0_rgba(255,255,255,0.18)] hover:bg-secondary active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_2px_8px_rgba(20,184,166,0.1)]",
        destructive:
          "border border-red-800/20 bg-gradient-to-b from-red-600 via-red-700 to-red-800 text-white shadow-[0_4px_16px_rgba(239,68,68,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.2),inset_0_1px_0_rgba(255,255,255,0.18)] hover:from-red-500 hover:via-red-600 hover:to-red-700",
        outline:
          "border-1 border-primary/50 bg-transparent text-primary hover:bg-primary-500/10 hover:border-secondary hover:text-secondary",
        secondary:
          "border border-black/20 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-800 text-white shadow-[0_4px_16px_rgba(71,85,105,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] hover:shadow-[0_6px_20px_rgba(71,85,105,0.2),inset_0_1px_0_rgba(255,255,255,0.18)] hover:from-slate-500 hover:via-slate-600 hover:to-slate-700",
        ghost: "hover:bg-teal-500/10 hover:text-teal-400 text-gray-400",
        link: "text-teal-400 underline-offset-4 hover:underline hover:text-teal-300",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
