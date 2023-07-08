import { MyLoadouts } from "@bbforge/loadouts";
import { Logout } from "@bbforge/auth";
import { Button } from "@bbforge/design-system";
import { prisma } from "@bbforge/database";

export default async function Page() {
  const weapons = await prisma.weapon.findMany({
    include: {
      attachments: true,
    },
    orderBy: {
      name: "desc",
    },
  });

  const groupedAttachments = weapons.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = [];
    }

    acc[curr.name].push(curr.attachments.map((x) => x.attachmentName));

    return acc;
  }, {});

  return (
    <>
      <div className="container mx-auto">
        <header className="text-slate-200 flex justify-between items-center h-32">
          <p className="text-2xl font-semibold">Battlebit Forge</p>
          <div className="space-x-4">
            <Button variant="primary">Forge Loadout</Button>
            <Logout />
          </div>
        </header>
        <MyLoadouts />
        <section className="grid grid-cols-6 gap-x-4 gap-y-10">
          {weapons.map((x) => (
            <div className="text-white">
              <img src={x.imageUrl} className="w-52" alt={x.name} />
              <h2 className="text-1xl font-bold mt-4">{x.name}</h2>
              <p className="text-slate-400 break-words">
                {groupedAttachments[x.name]?.join(", ")}
              </p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
