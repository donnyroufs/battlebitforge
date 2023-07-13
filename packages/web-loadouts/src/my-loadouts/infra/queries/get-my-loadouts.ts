import { prisma } from "@bbforge/database";

export type LoadoutsView = {
  id: number;
  name: string;
  slug: string;
  userId: string;
  items: { attachmentName: string | null; slotName: string }[];
};

export async function getMyLoadouts(userId: string) {
  return prisma.loadouts.findMany({
    where: {
      userId,
    },
    include: {
      votes: {
        select: {
          type: true,
        },
      },
      weapon: {
        select: {
          imageUrl: true,
        },
      },
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
  });
}
