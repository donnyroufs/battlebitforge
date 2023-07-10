import { prisma } from "@bbforge/database";
import { run } from "@bbforge/scraper";
import { NextResponse } from "next/server";

export async function GET() {
  const scraped = await prisma.scrapeHistory.count();

  if (scraped > 0) return NextResponse.json({ message: "Already scraped" });

  await run();

  return NextResponse.json({ runAt: new Date() });
}
