/*
  Warnings:

  - Added the required column `slug` to the `Loadouts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loadouts" ADD COLUMN     "slug" TEXT NOT NULL;
