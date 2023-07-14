import {
  PrismaClient,
  SlotAttachments,
  WeaponSlotAttachments,
} from "@prisma/client";
const seed = require("../../../apps/scraper/data/1689326921868/seed.json") as {
  weapons: {
    name: string;
    type: string;
    attachments: { slot: string; attachments: string[] }[];
  }[];
  attachments: string[];
  slots: string[];
  createdAt: number;
};
const { attachments, createdAt, weapons, slots } = seed;

const prisma = new PrismaClient();

async function main() {
  try {
    // Create Attachments
    await prisma.attachments.createMany({
      data: attachments.map((name) => ({
        name,
      })),
      skipDuplicates: true,
    });

    // Create Slots
    await prisma.slots.createMany({
      data: slots.map((name) => ({
        name,
      })),
      skipDuplicates: true,
    });

    // Query created Attachments and Slots
    const createdAttachments = await prisma.attachments.findMany();
    const createdSlots = await prisma.slots.findMany();

    const slotAttachmentsData: Omit<SlotAttachments, "id">[] = [];
    for (const weapon of weapons) {
      for (const wa of weapon.attachments) {
        const slotId = createdSlots.find((x) => x.name === wa.slot)?.id;

        if (!slotId) {
          console.error("failed to find slot", { wa, slotId });
          continue;
        }

        for (const attachment of wa.attachments) {
          const attachmentId = createdAttachments.find(
            (x) => x.name === attachment
          )?.id;

          if (!attachmentId) {
            console.error("failed to find attachment", { wa, attachmentId });
            continue;
          }

          slotAttachmentsData.push({
            slotsId: slotId,
            attachmentsId: attachmentId,
          });
        }
      }
    }

    await prisma.slotAttachments.createMany({
      skipDuplicates: true,
      data: slotAttachmentsData,
    });

    // Create Weapons
    await prisma.weapons.createMany({
      data: weapons.map((weapon) => ({
        name: weapon.name,
        category: weapon.type,
        imageUrl: `/weapons/${weapon.name
          .replace(" ", "")
          .replace("-", "")}.png`,
      })),
      skipDuplicates: true,
    });

    const createdSlotAttachments = await prisma.slotAttachments.findMany();
    const createdWeapons = await prisma.weapons.findMany();

    const weaponSlotAttachmentsData: Omit<WeaponSlotAttachments, "id">[] = [];

    for (const weapon of weapons) {
      for (const wa of weapon.attachments) {
        const slotId = createdSlots.find((x) => x.name === wa.slot)?.id;

        if (!slotId) {
          console.error("failed to find slot", { wa, slotId });
          continue;
        }

        for (const attachment of wa.attachments) {
          const attachmentId = createdAttachments.find(
            (x) => x.name === attachment
          )?.id;

          if (!attachmentId) {
            console.error("failed to find attachment", { wa, attachmentId });
            continue;
          }

          const slotAttachmentsId = createdSlotAttachments.find(
            (x) => x.attachmentsId === attachmentId && x.slotsId === slotId
          )?.id;

          // This weapon does not have this combination
          if (!slotAttachmentsId) {
            continue;
          }

          const weaponId = createdWeapons.find(
            (x) => x.name === weapon.name
          )?.id;

          if (!weaponId) {
            console.error("Failed to find weapon", { weaponId });
            continue;
          }

          weaponSlotAttachmentsData.push({
            slotAttachmentsId,
            weaponsId: weaponId,
          });
        }
      }
    }

    await prisma.weaponSlotAttachments.createMany({
      skipDuplicates: true,
      data: weaponSlotAttachmentsData,
    });

    await prisma.dataHistory.create({
      data: {
        timestamp: createdAt,
        data: seed,
      },
    });

    console.log("Seed data created successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
