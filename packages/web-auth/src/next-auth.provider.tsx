"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export function NextAuthProvider(props: Props) {
  return <SessionProvider>{props.children}</SessionProvider>;
}
