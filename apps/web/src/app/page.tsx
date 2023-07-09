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

    acc[curr.name].push(...curr.attachments.map((x) => x.attachmentName));

    return acc;
  }, {});

  return (
    <>
      <div className="container mx-auto mb-8">
        <header className="text-slate-200 flex justify-between items-center h-32">
          <p className="text-2xl font-semibold">Battlebit Forge</p>
          <div className="space-x-4">
            <Button variant="primary">Forge Loadout</Button>
            <Logout />
          </div>
        </header>
        <MyLoadouts />
        <section className="grid grid-cols-6 gap-x-4 gap-y-10">
          {[...weapons]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((x) => (
              <div className="text-white bg-[#101319] p-4">
                <img
                  src={x.imageUrl}
                  className="w-52 px-6 py-12"
                  alt={x.name}
                />
                <h2 className="text-1xl font-bold mt-4 mb-2">{x.name}</h2>
                <select className="bg-[#101319] p-4 w-full border-2 border-gray-800">
                  {groupedAttachments[x.name]?.map((attachment) => (
                    <option key={attachment} value={attachment}>
                      {attachment}
                    </option>
                  ))}
                </select>
              </div>
            ))}
        </section>
      </div>
    </>
  );
}
