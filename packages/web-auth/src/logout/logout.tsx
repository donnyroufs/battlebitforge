"use client";

import { signOut } from "next-auth/react";
import { Button } from "@bbforge/design-system";

export function Logout() {
  return (
    <Button onClick={() => signOut()} variant="ghost">
      Logout
    </Button>
  );
}
