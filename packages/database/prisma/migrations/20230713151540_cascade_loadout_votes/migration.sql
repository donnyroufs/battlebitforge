-- DropForeignKey
ALTER TABLE "LoadoutVotes" DROP CONSTRAINT "LoadoutVotes_loadoutsId_fkey";

-- DropForeignKey
ALTER TABLE "LoadoutVotes" DROP CONSTRAINT "LoadoutVotes_userId_fkey";

-- AddForeignKey
ALTER TABLE "LoadoutVotes" ADD CONSTRAINT "LoadoutVotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadoutVotes" ADD CONSTRAINT "LoadoutVotes_loadoutsId_fkey" FOREIGN KEY ("loadoutsId") REFERENCES "Loadouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
