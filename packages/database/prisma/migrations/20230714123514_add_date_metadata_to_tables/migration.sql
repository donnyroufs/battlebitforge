/*
  Warnings:

  - Added the required column `updatedAt` to the `Attachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LoadoutItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LoadoutVotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Loadouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SlotAttachments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Slots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Weapons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attachments" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LoadoutItems" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LoadoutVotes" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Loadouts" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SlotAttachments" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Slots" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Weapons" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
