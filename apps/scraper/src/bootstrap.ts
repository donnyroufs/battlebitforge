import puppeteer from "puppeteer";
import { Scraper } from "./scraper";
import { PrismaClient } from "@prisma/client";

// TODO: Versioning, what game version is this data from?
// TODO: Save differences between datasets incase something goes wrong
// TODO: Perhaps add an ID incase things get renamed.
export async function bootstrap() {
  const prisma = new PrismaClient();
  const scraper = new Scraper(puppeteer);

  const result = await scraper.scrape();

  await prisma.attachment.createMany({
    data: result.flatMap((x) => x.attachments),
    skipDuplicates: true,
  });

  await prisma.weapon.createMany({
    data: result
      .flatMap((x) => x.weapon)
      .map((weapon) => ({
        name: weapon.name,
        // Looks like some weapons still have a rank of null
        rank: weapon.rank ?? 9000,
        imageUrl: weapon.image,
      })),
    skipDuplicates: true,
  });

  for (const item of result) {
    for (const attachment of item.attachments) {
      await prisma.weaponAttachments.createMany({
        data: {
          weaponName: item.weapon.name,
          attachmentName: attachment.name,
        },
        skipDuplicates: true,
      });
    }
  }
  // TODO: Do all of this in a transaction
  await prisma.scrapeHistory.create({
    data: {
      data: result,
    },
  });
}

bootstrap();
