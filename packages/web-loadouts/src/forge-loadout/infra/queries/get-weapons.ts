import { prisma } from "@bbforge/database";

type WeaponsView = {
  id: number;
  name: string;
  attachments: {
    slot: string | null;
    attachments: { id: number; name: string }[];
  }[];
};

export async function getWeapons(): Promise<WeaponsView[]> {
  const weapons =
    (await prisma.weaponsView.findMany()) as unknown as WeaponsView[];

  return weapons.map((weapon) => ({
    ...weapon,
    attachments: weapon.attachments.filter((x) => x.slot !== null),
  }));
}
