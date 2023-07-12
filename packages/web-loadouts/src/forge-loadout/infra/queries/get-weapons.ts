import { prisma } from "@bbforge/database";

type WeaponsView = {
  id: number;
  name: string;
  attachments: { slot: string; attachments: { id: number; name: string }[] }[];
};

export async function getWeapons(): Promise<WeaponsView[]> {
  return prisma.weaponsView.findMany() as unknown as WeaponsView[];
}
