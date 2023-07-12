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
          { id: 9, name: "Bipod" },
          { id: 10, name: "Tactical Light" },
          { id: 11, name: "Laser Sight" },
          { id: 12, name: "30 Round Magazine" },
          { id: 13, name: "40 Round Magazine" },
          { id: 14, name: "50 Round Magazine" },
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
          { id: 9, slotsId: 4, attachmentsId: 9 },
          { id: 10, slotsId: 5, attachmentsId: 12 },
          { id: 11, slotsId: 5, attachmentsId: 13 },
          { id: 12, slotsId: 5, attachmentsId: 14 },
          { id: 13, slotsId: 1, attachmentsId: 4 },
          { id: 14, slotsId: 2, attachmentsId: 2 },
          { id: 15, slotsId: 2, attachmentsId: 1 },
          { id: 16, slotsId: 3, attachmentsId: 3 },
          { id: 17, slotsId: 3, attachmentsId: 1 },
        ],
        skipDuplicates: true,
      }),

      // Create Weapons
      prisma.weapons.createMany({
        data: [
          { id: 1, name: "M16A3" },
          { id: 2, name: "AEK-971" },
          { id: 3, name: "AK-74M" },
          { id: 4, name: "M4A1" },
          { id: 5, name: "SCAR-H" },
          { id: 6, name: "G36C" },
          { id: 7, name: "L85A2" },
          { id: 8, name: "AUG A3" },
          { id: 9, name: "M416" },
          { id: 10, name: "FAMAS" },
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
          { id: 5, weaponsId: 2, slotAttachmentsId: 1 },
          { id: 6, weaponsId: 2, slotAttachmentsId: 2 },
          { id: 7, weaponsId: 2, slotAttachmentsId: 3 },
          { id: 8, weaponsId: 2, slotAttachmentsId: 4 },
          { id: 9, weaponsId: 3, slotAttachmentsId: 1 },
          { id: 10, weaponsId: 3, slotAttachmentsId: 2 },
          { id: 11, weaponsId: 3, slotAttachmentsId: 3 },
          { id: 12, weaponsId: 3, slotAttachmentsId: 4 },
          { id: 13, weaponsId: 4, slotAttachmentsId: 1 },
          { id: 14, weaponsId: 4, slotAttachmentsId: 2 },
          { id: 15, weaponsId: 4, slotAttachmentsId: 3 },
          { id: 16, weaponsId: 4, slotAttachmentsId: 4 },
          { id: 17, weaponsId: 5, slotAttachmentsId: 1 },
          { id: 18, weaponsId: 5, slotAttachmentsId: 2 },
          { id: 19, weaponsId: 5, slotAttachmentsId: 3 },
          { id: 20, weaponsId: 5, slotAttachmentsId: 4 },
          { id: 21, weaponsId: 6, slotAttachmentsId: 1 },
          { id: 22, weaponsId: 6, slotAttachmentsId: 2 },
          { id: 23, weaponsId: 6, slotAttachmentsId: 3 },
          { id: 24, weaponsId: 6, slotAttachmentsId: 4 },
          { id: 25, weaponsId: 7, slotAttachmentsId: 1 },
          { id: 26, weaponsId: 7, slotAttachmentsId: 2 },
          { id: 27, weaponsId: 7, slotAttachmentsId: 3 },
          { id: 28, weaponsId: 7, slotAttachmentsId: 4 },
          { id: 29, weaponsId: 8, slotAttachmentsId: 1 },
          { id: 30, weaponsId: 8, slotAttachmentsId: 2 },
          { id: 31, weaponsId: 8, slotAttachmentsId: 3 },
          { id: 32, weaponsId: 8, slotAttachmentsId: 4 },
          { id: 33, weaponsId: 9, slotAttachmentsId: 1 },
          { id: 34, weaponsId: 9, slotAttachmentsId: 2 },
          { id: 35, weaponsId: 9, slotAttachmentsId: 3 },
          { id: 36, weaponsId: 9, slotAttachmentsId: 4 },
          { id: 37, weaponsId: 10, slotAttachmentsId: 1 },
          { id: 38, weaponsId: 10, slotAttachmentsId: 2 },
          { id: 39, weaponsId: 10, slotAttachmentsId: 3 },
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
