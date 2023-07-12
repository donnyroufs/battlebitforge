/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Loadouts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Loadouts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Loadouts_name_key";

-- AlterTable
ALTER TABLE "Loadouts" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Loadouts_name_userId_key" ON "Loadouts"("name", "userId");

-- AddForeignKey
ALTER TABLE "Loadouts" ADD CONSTRAINT "Loadouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
