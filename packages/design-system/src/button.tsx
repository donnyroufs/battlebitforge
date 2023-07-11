import { ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

const buttonStyles = cva("px-4 py-2 font-bold transition-all rounded-lg", {
  variants: {
    variant: {
      primary: "bg-red-700 text-red-100 hover:bg-red-800",
      ghost: "text-slate-200 hover:opacity-80",
    },
    w: {
      auto: "w-auto",
      full: "w-full",
    },
  },
});

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {}

export function Button({
  variant = "primary",
  w = "auto",
  ...props
}: IButtonProps) {
  return <button className={buttonStyles({ variant, w })} {...props} />;
}
