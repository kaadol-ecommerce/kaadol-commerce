import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { CarbonIconType } from "@carbon/icons-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex relative items-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-button text-primary-foreground hover:bg-primary-button-hover",
        danger:
          "bg-danger-button  hover:bg-danger-button-hover text-primary-foreground",
        "danger-outline":
          "border-danger-button-secondary text-danger-button-secondary hover:bg-danger-button-hover hover:text-white border",
        tertiary:
          " border border-tertiary-button hover:bg-tertiary-button-hover text-tertiary-button hover:text-white active:bg-tertiary-button-active",
        secondary:
          "bg-secondary-button hover:bg-secondary-button-hover text-primary-foreground active:bg-secondary-button-active",
        ghost: "text-primary",
      },
      size: {
        "2x lg": "h-20 pl-4 pr-16 pt-4 items-start",
        "extra large": "h-16 pl-4 pr-16 items-start pt-4",
        sm: "h-8 pl-4 pr-16",
        md: "h-10 pl-4 pr-16",
        lg: "h-12  pl-4 pr-16",
        icon: "h-10 w-10",
        expressive: "h-12 pl-4 pr-16 min-w-32 text-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const buttonIconVariants = cva("w-4 h-4 absolute right-4", {
  variants: {
    variant: {
      primary: "fill-primary-foreground",
      danger: "fill-primary-foreground",
      "danger-outline":
        "ill-danger-button-secondary hover:bg-danger-button-hover",
      tertiary: "fill-tertiary-button",
      secondary: "fill-primary-foreground",
      ghost: "fill-primary",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  Icon?: CarbonIconType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, Icon, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <>
          {children}
          {Icon ? (
            <Icon
              className={cn(
                buttonIconVariants({
                  variant,
                  className,
                })
              )}
            />
          ) : null}
        </>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
