import { Button, Header } from "@bbforge/ui";
import { prisma } from "@bbforge/database";

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <>
      <Header text="Web" />
      <hr />
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <Button />
    </>
  );
}