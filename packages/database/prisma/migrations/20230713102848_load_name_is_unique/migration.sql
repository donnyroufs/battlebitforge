/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Loadouts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Loadouts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Loadouts_name_key" ON "Loadouts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Loadouts_slug_key" ON "Loadouts"("slug");
