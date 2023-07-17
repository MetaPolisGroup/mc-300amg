import { cn } from "@/utils/merge-class";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC, InputHTMLAttributes } from "react";

export const InputVariants = cva(
  "rounded-sm py-2 w-full focus:outline-none disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-[--colors-input] boder-[--colors-inputSecondary]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariants> {
  isDisable?: boolean;
}

const Input: FC<InputProps> = ({ className, variant, isDisable, ...props }) => {
  return (
    <input
      className={cn(InputVariants({ className, variant }))}
      disabled={isDisable}
      {...props}
    />
  );
};

export default Input;
