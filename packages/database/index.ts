import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient = globalThis.prisma || new PrismaClient();

export type WeaponsView = {
  id: number;
  name: string;
  attachments: { slot: string; attachments: { id: number; name: string }[] }[];
};

export type LoadoutsView = {
  id: number;
  name: string;
  attachments: {
    slotId: string;
    attachmentId: number | null;
    attachmentName: string | null;
  }[];
};

export async function queryWeapons(): Promise<WeaponsView[]> {
  return prisma.weaponsView.findMany() as unknown as WeaponsView[];
}

export async function queryLoadout(id: number): Promise<WeaponsView[]> {
  return prisma.$queryRawUnsafe(`SELECT * FROM "LoadoutsView" WHERE id=${id};`);
}

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
