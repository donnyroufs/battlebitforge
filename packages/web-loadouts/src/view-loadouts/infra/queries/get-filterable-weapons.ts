import { prisma } from "@bbforge/database";

export type WeaponsView = {
  id: number;
  name: string;
  attachments: { slot: string; attachments: { id: number; name: string }[] }[];
};

export async function getFilterableWeapons() {
  const loadouts = await prisma.loadouts.findMany({
    select: {
      weapon: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    distinct: "weaponsId",
  });

  return loadouts.map((x) => ({
    id: x.weapon.id,
    name: x.weapon.name,
  }));
}
