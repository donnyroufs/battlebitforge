import { prisma } from "@bbforge/database";
import { ForgeForm } from "./form";
import { getWeapons } from "./infra/queries/get-weapons";

export async function Forge() {
  const weapons = await getWeapons();
  const slots = await prisma.slots.findMany({ distinct: "name" });

  return (
    <div className="flex flex-row gap-4 w-full mt-8">
      <div className="flex px-6 py-12 flex-col flex-[5] text-gray-400">
        <div className="sm:w-full xl:w-2/4 mx-auto">
          <h2 className="text-3xl font-black mb-8 text-[#FE9B00] uppercase">
            Forge your loadout
          </h2>
          <ForgeForm weapons={weapons} slots={slots} />
        </div>
      </div>
    </div>
  );
}
