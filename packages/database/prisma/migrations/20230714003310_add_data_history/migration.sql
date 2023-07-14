-- CreateTable
CREATE TABLE "DataHistory" (
    "id" SERIAL NOT NULL,
    "data" JSONB NOT NULL,
    "timestamp" BIGINT NOT NULL,

    CONSTRAINT "DataHistory_pkey" PRIMARY KEY ("id")
);
