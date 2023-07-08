import { PrismaClient } from "@prisma/client";

export const prisma: PrismaClient = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
