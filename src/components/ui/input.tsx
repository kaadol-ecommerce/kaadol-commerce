import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex border-b focus-visible:bg-transparent  border-input py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground ",
  {
    variants: {
      variant: {
        default:
          "w-full bg-field pr-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        fluid: "w-full bg-transparent focus-visible:outline-none",
      },
      dimension: {
        small: "h-8",
        medium: "h-10",
        large: "h-12",
      },
      state: {
        error: "indent-3",
        default: "indent-3",
        none: "indent-3"
      },
    },
    compoundVariants: [
      {
        variant: "fluid",
        state: ["default", "error"],
        className: "indent-0",
      },
      {
        variant: "default",
        state: ["error"],
        className: "border-danger border focus-visible:ring-danger",
      },
    ],
    defaultVariants: {
      variant: "default",
      dimension: "medium",
    },
  }
);

const containerVariants = cva("", {
  variants: {
    variant: {
      default: "block",
      fluid:
        "flex flex-col bg-field pt-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
    },
    state: {
      error: "border-danger",
      default: "",
       none: ""
    },
  },
  compoundVariants: [
    {
      variant: "fluid",
      state: "error",
      className: "border-danger border focus-within:ring-danger px-3",
    },
    {
      variant: "fluid",
      state: ["default", "error"],
      className: "px-3",
    }

  ],

  defaultVariants: {
    variant: "default",
    state: "default",
  },
});

const labelVariants = cva("text-xs text-text-secondary block", {
  variants: {
    variant: {
      default: "mb-2",
      fluid: "bg-transparent",
    },
    state: {
      error: "",
      default: "",
      none: ""
    },
  },
  compoundVariants: [
    {
      variant: "fluid",
      state: "none",
      className: "pl-3",
    },

  ],
  defaultVariants: {
    variant: "default",
    state: "default",
  },
});

const helperTextVariants = cva("text-xs mt-1 block", {
  variants: {
    variant: {
      default: "",
      fluid: "h-6 pb-2",
    },
    state: {
      error: "text-danger",
      default: "text-text-secondary",
      none: ""
    },
  },
  compoundVariants: [
    {
      variant: "fluid",
      state: "none",
      className: "pl-3",
    },
  ],
  defaultVariants: {
    state: "default",
    variant: "default",
  },
});

type InputPropsBase = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
    label?: string;
    helperText?: string;
    type: "text" | "password" | "email" | "number";
    errorText?: string;
    state?: never; // state is not allowed in InputPropsBase
  };

type InputPropsWithFluid = InputPropsBase & {
  variant?: "fluid";
  dimension?: never; // size is not allowed when variant is fluid
};

type InputPropsWithDefault = InputPropsBase & {
  variant?: "default";
  dimension?: "small" | "medium" | "large";
};

export type InputProps = InputPropsWithFluid | InputPropsWithDefault;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, variant, dimension, helperText, errorText, ...props },
    ref
  ) => {
    const state = errorText ? "error" : helperText ?  "default" : "none"
    return (
      <label className={cn(containerVariants({ variant, className, state: state }))}>
        {props.label && (
          <span className={cn(labelVariants({ variant, className, state }))}>
            {props.label}
          </span>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({
              variant,
              dimension,
              className,
              state,
            })
          )}
          ref={ref}
          {...props}
        />
        {!!(errorText || helperText) && (
          <span
            className={helperTextVariants({
              variant,
              state,
            })}
          >
            {errorText ?? helperText}
          </span>
        )}
      </label>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
