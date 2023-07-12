import { prisma } from "@bbforge/database";

export type LoadoutsView = {
  id: number;
  name: string;
  weapon: {
    name: string;
  };
  slug: string;
  userId: string;
  items: { attachmentName: string | null; slotName: string }[];
};

export type WeaponsView = {
  id: number;
  name: string;
  attachments: { slot: string; attachments: { id: number; name: string }[] }[];
};

export async function getLoadoutBySlug(slug: string): Promise<LoadoutsView> {
  const loadout = await prisma.loadouts.findFirst({
    where: {
      slug,
    },
    include: {
      weapon: {
        select: {
          name: true,
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

  console.timeEnd("loadout");

  return mapLoadoutAsync(loadout);
}

async function mapLoadoutAsync(loadout: any): Promise<LoadoutsView> {
  const weapon = (await prisma.weaponsView.findFirst({
    where: {
      id: loadout.weaponsId,
    },
  })) as WeaponsView;

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
    },
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
