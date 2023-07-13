/*
  Warnings:

  - Added the required column `imageUrl` to the `Weapons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Weapons" ADD COLUMN     "imageUrl" TEXT NOT NULL;
