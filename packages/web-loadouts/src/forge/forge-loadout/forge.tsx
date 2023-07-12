import { prisma, queryWeapons } from "@bbforge/database";
import { ForgeForm } from "./form";

export async function Forge() {
  const weapons = await queryWeapons();
  const slots = await prisma.slots.findMany({ distinct: "name" });

  return (
    <div className="flex flex-row gap-4 w-full">
      <div className="bg-[#14181f] flex px-6 py-12 flex-col flex-[5] text-slate-400">
        <div className="w-1/2 mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-slate-400">
            Forge your loadout
          </h2>
          <ForgeForm weapons={weapons} slots={slots} />
        </div>
      </div>
    </div>
  );
}
