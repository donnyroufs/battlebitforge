import { Prisma } from "@prisma/client";
import { prisma } from "@bbforge/database";

export type LoadoutsView = {
  id: number;
  name: string;
  slug: string;
  userId: string;
  items: { attachmentName: string | null; slotName: string }[];
};

export async function getLoadouts(
  filterBy: "all" | string,
  limit: number = 20
) {
  const filter = filterBy === "all" ? undefined : filterBy;
  return prisma.loadouts.findMany({
    where: {
      weapon: {
        name: filter,
      },
    },
    include: {
      items: {
        select: {
          weaponSlotAttachments: {
            select: {
              slotAttachment: {
                select: {
                  slots: {
                    select: {
                      name: true,
                    },
                  },
                  attachments: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    take: limit,
  });
}

export type GetLoadoutsResult = Prisma.PromiseReturnType<typeof getLoadouts>;