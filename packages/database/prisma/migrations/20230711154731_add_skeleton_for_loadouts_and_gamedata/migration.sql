-- CreateTable
CREATE TABLE "Attachments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Slots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SlotAttachments" (
    "id" SERIAL NOT NULL,
    "slotsId" INTEGER NOT NULL,
    "attachmentsId" INTEGER NOT NULL,

    CONSTRAINT "SlotAttachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Weapons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeaponSlotAttachments" (
    "id" SERIAL NOT NULL,
    "weaponsId" INTEGER NOT NULL,
    "slotAttachmentsId" INTEGER NOT NULL,

    CONSTRAINT "WeaponSlotAttachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loadouts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weaponsId" INTEGER NOT NULL,

    CONSTRAINT "Loadouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoadoutItems" (
    "id" SERIAL NOT NULL,
    "weaponSlotAttachmentsId" INTEGER NOT NULL,
    "loadoutId" INTEGER NOT NULL,

    CONSTRAINT "LoadoutItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Attachments_name_key" ON "Attachments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Slots_name_key" ON "Slots"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SlotAttachments_slotsId_attachmentsId_key" ON "SlotAttachments"("slotsId", "attachmentsId");

-- CreateIndex
CREATE UNIQUE INDEX "Weapons_name_key" ON "Weapons"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Loadouts_name_key" ON "Loadouts"("name");

-- AddForeignKey
ALTER TABLE "SlotAttachments" ADD CONSTRAINT "SlotAttachments_slotsId_fkey" FOREIGN KEY ("slotsId") REFERENCES "Slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SlotAttachments" ADD CONSTRAINT "SlotAttachments_attachmentsId_fkey" FOREIGN KEY ("attachmentsId") REFERENCES "Attachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponSlotAttachments" ADD CONSTRAINT "WeaponSlotAttachments_weaponsId_fkey" FOREIGN KEY ("weaponsId") REFERENCES "Weapons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponSlotAttachments" ADD CONSTRAINT "WeaponSlotAttachments_slotAttachmentsId_fkey" FOREIGN KEY ("slotAttachmentsId") REFERENCES "SlotAttachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loadouts" ADD CONSTRAINT "Loadouts_weaponsId_fkey" FOREIGN KEY ("weaponsId") REFERENCES "Weapons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadoutItems" ADD CONSTRAINT "LoadoutItems_weaponSlotAttachmentsId_fkey" FOREIGN KEY ("weaponSlotAttachmentsId") REFERENCES "WeaponSlotAttachments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadoutItems" ADD CONSTRAINT "LoadoutItems_loadoutId_fkey" FOREIGN KEY ("loadoutId") REFERENCES "Loadouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
