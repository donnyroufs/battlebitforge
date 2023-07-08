"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@bbforge/design-system";

export function Logout() {
  const session = useSession();

  if (session.status !== "authenticated") {
    return (
      <Button onClick={() => signIn("discord")} variant="ghost">
        Login
      </Button>
    );
  }

  return (
    <Button onClick={() => signOut()} variant="ghost">
      Logout
    </Button>
  );
}
