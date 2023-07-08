-- CreateTable
CREATE TABLE "Weapon" (
    "name" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Attachment" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "WeaponAttachments" (
    "weaponName" TEXT NOT NULL,
    "attachmentName" TEXT NOT NULL,

    CONSTRAINT "WeaponAttachments_pkey" PRIMARY KEY ("weaponName","attachmentName")
);

-- CreateIndex
CREATE UNIQUE INDEX "Weapon_name_key" ON "Weapon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_name_key" ON "Attachment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WeaponAttachments_weaponName_attachmentName_key" ON "WeaponAttachments"("weaponName", "attachmentName");
