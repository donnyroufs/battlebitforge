import { AnchorHTMLAttributes } from "react";
import NextLink from "next/link";
import { VariantProps } from "class-variance-authority";
import { buttonOrLinkStyles } from "./button";

export interface ILinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonOrLinkStyles> {}

export function Link({
  variant = "primary",
  w = "auto",
  href,
  ...props
}: ILinkProps) {
  return (
    <NextLink
      className={buttonOrLinkStyles({ variant, w })}
      {...props}
      href={href!}
    />
  );
}
