import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const transaction = await prisma.$transaction([
      // Create Attachments
      prisma.attachments.createMany({
        data: [
          { id: 1, name: "Kobra Red Dot" },
          { id: 2, name: "Holographic Sight" },
          { id: 3, name: "PK-A" },
          { id: 4, name: "ACOG" },
          { id: 5, name: "Flash Suppressor" },
          { id: 6, name: "Suppressor" },
          { id: 7, name: "Foregrip" },
          { id: 8, name: "Extended Magazines" },
        ],
        skipDuplicates: true,
      }),

      // Create Slots
      prisma.slots.createMany({
        data: [
          { id: 1, name: "Optics" },
          { id: 2, name: "Barrel" },
          { id: 3, name: "Underbarrel" },
          { id: 4, name: "Grip" },
          { id: 5, name: "Magazine" },
        ],
        skipDuplicates: true,
      }),

      // Create SlotAttachments
      prisma.slotAttachments.createMany({
        data: [
          { id: 1, slotsId: 1, attachmentsId: 1 },
          { id: 2, slotsId: 1, attachmentsId: 2 },
          { id: 3, slotsId: 1, attachmentsId: 3 },
          { id: 4, slotsId: 2, attachmentsId: 4 },
          { id: 5, slotsId: 2, attachmentsId: 5 },
          { id: 6, slotsId: 3, attachmentsId: 6 },
          { id: 7, slotsId: 3, attachmentsId: 7 },
          { id: 8, slotsId: 4, attachmentsId: 8 },
          { id: 9, slotsId: 4, attachmentsId: 1 },
          { id: 10, slotsId: 5, attachmentsId: 2 },
          { id: 11, slotsId: 5, attachmentsId: 3 },
          { id: 12, slotsId: 3, attachmentsId: 4 },
          { id: 13, slotsId: 5, attachmentsId: 8 },
        ],
        skipDuplicates: true,
      }),

      // Create Weapons
      prisma.weapons.createMany({
        data: [
          { id: 1, name: "M4A1" },
          { id: 2, name: "HK-419" },
        ],
        skipDuplicates: true,
      }),

      // Create WeaponSlotAttachments
      prisma.weaponSlotAttachments.createMany({
        data: [
          { id: 1, weaponsId: 1, slotAttachmentsId: 1 },
          { id: 2, weaponsId: 1, slotAttachmentsId: 2 },
          { id: 3, weaponsId: 1, slotAttachmentsId: 3 },
          { id: 4, weaponsId: 1, slotAttachmentsId: 4 },
          { id: 5, weaponsId: 1, slotAttachmentsId: 5 },
          { id: 6, weaponsId: 1, slotAttachmentsId: 6 },
          { id: 7, weaponsId: 1, slotAttachmentsId: 7 },
          { id: 8, weaponsId: 1, slotAttachmentsId: 9 },
          { id: 9, weaponsId: 1, slotAttachmentsId: 10 },
          { id: 10, weaponsId: 1, slotAttachmentsId: 11 },
          { id: 11, weaponsId: 1, slotAttachmentsId: 13 },
          { id: 12, weaponsId: 2, slotAttachmentsId: 1 },
        ],
        skipDuplicates: true,
      }),
    ]);

    console.log("Seed data created successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
