import { ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

export const buttonOrLinkStyles = cva("px-5 py-3 font-bold transition-all", {
  variants: {
    variant: {
      primary: "bg-[#0B97D9] text-white hover:bg-[#0a8ac5]",
      secondary: "bg-[#212330] text-white hover:bg-[#1c1e29]",
      ghost: "text-slate-300 hover:opacity-80",
    },
    w: {
      auto: "w-auto",
      full: "w-full",
    },
  },
});

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonOrLinkStyles> {}

export function Button({
  variant = "primary",
  w = "auto",
  ...props
}: IButtonProps) {
  return <button className={buttonOrLinkStyles({ variant, w })} {...props} />;
}
