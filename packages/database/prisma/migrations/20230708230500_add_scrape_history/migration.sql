-- CreateTable
CREATE TABLE "ScrapeHistory" (
    "id" SERIAL NOT NULL,
    "data" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScrapeHistory_pkey" PRIMARY KEY ("id")
);
