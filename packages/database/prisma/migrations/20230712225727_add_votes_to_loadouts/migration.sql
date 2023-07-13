-- CreateEnum
CREATE TYPE "LoadoutVote" AS ENUM ('Like', 'Dislike');

-- CreateTable
CREATE TABLE "LoadoutVotes" (
    "id" SERIAL NOT NULL,
    "type" "LoadoutVote" NOT NULL,
    "userId" TEXT NOT NULL,
    "loadoutsId" INTEGER NOT NULL,

    CONSTRAINT "LoadoutVotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoadoutVotes_userId_loadoutsId_key" ON "LoadoutVotes"("userId", "loadoutsId");

-- AddForeignKey
ALTER TABLE "LoadoutVotes" ADD CONSTRAINT "LoadoutVotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadoutVotes" ADD CONSTRAINT "LoadoutVotes_loadoutsId_fkey" FOREIGN KEY ("loadoutsId") REFERENCES "Loadouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
