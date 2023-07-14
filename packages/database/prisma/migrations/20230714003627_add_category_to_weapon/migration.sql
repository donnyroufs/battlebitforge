/*
  Warnings:

  - Added the required column `category` to the `Weapons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Weapons" ADD COLUMN     "category" TEXT NOT NULL;
