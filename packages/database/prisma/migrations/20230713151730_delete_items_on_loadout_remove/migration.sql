-- DropForeignKey
ALTER TABLE "LoadoutItems" DROP CONSTRAINT "LoadoutItems_loadoutId_fkey";

-- DropForeignKey
ALTER TABLE "LoadoutItems" DROP CONSTRAINT "LoadoutItems_weaponSlotAttachmentsId_fkey";

-- AddForeignKey
ALTER TABLE "LoadoutItems" ADD CONSTRAINT "LoadoutItems_weaponSlotAttachmentsId_fkey" FOREIGN KEY ("weaponSlotAttachmentsId") REFERENCES "WeaponSlotAttachments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadoutItems" ADD CONSTRAINT "LoadoutItems_loadoutId_fkey" FOREIGN KEY ("loadoutId") REFERENCES "Loadouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
