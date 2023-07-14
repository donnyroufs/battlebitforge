import { prisma } from "@bbforge/database";
import { LoadoutVote, Prisma } from "@prisma/client";

export type LoadoutsView = {
  id: number;
  name: string;
  weapon: {
    name: string;
    imageUrl: string
  };
  slug: string;
  userId: string;
  items: { attachmentName: string | null; slotName: string }[];
  votes: { userId: string, type: LoadoutVote }[]
};

export type WeaponsView = {
  id: number;
  name: string;
  attachments: { slot: string; attachments: { id: number; name: string }[] }[];
};

export async function getLoadoutBySlug(slug: string) {
  const loadout = await prisma.loadouts.findUnique({
    where: {
      slug,
    },
    include: {
      votes: {
        select: {
          userId: true,
          type: true,
        },
      },
      weapon: {
        select: {
          name: true,
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

  return mapLoadoutAsync(loadout);
}

async function mapLoadoutAsync(loadout: any): Promise<LoadoutsView> {
  const res = (await prisma.weaponsView.findUnique({
    where: {
      id: loadout.weaponsId,
    },
  })) as WeaponsView;

  const weapon = {
    ...res,
    attachments: res.attachments.filter((x) => x.slot !== null),
  };

  const weaponSlots = weapon.attachments.map((x) => x.slot);
  const result: LoadoutsView = {
    id: loadout.id,
    name: loadout.name,
    slug: loadout.slug,
    userId: loadout.userId,
    items: weaponSlots.map((slot) => ({
      slotName: slot,
      attachmentName: null,
    })),
    weapon: {
      name: loadout.weapon.name,
      imageUrl: loadout.weapon.imageUrl,
    },
    votes: loadout.votes,
  };

  const selected = loadout.items.map((item) => ({
    slotName: item.weaponSlotAttachments.slotAttachment.slots.name,
    attachmentName: item.weaponSlotAttachments.slotAttachment.attachments.name,
  }));

  result.items = result.items.map((item) => ({
    attachmentName:
      selected.find((x) => x.slotName === item.slotName)?.attachmentName ??
      null,
    slotName: item.slotName,
  }));

  return result;
}

export type GetLoadoutBySlugResult = Prisma.PromiseReturnType<
  typeof getLoadoutBySlug
>;
