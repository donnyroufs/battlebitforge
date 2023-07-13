import { getServerSession } from "next-auth";
import { prisma } from "@bbforge/database";
import { Loadout } from "../view-loadouts";
import { getMyLoadouts } from "./infra/queries/get-my-loadouts";

export async function MyLoadouts() {
  // TODO: add user id to session
  const session = await getServerSession();
  const user = await prisma.user.findFirst({
    where: {
      name: session?.user?.name,
    },
    select: {
      id: true,
    },
  });

  const myLoadouts = await getMyLoadouts(user.id);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-3xl mb-8 text-[#FE9B00] uppercase font-extrabold mt-8">
          My Loadouts
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {myLoadouts.map((loadout) => (
          <Loadout {...loadout} key={loadout.id} />
        ))}
      </div>
    </div>
  );
}
