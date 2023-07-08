import puppeteer from "puppeteer";
import { Scraper } from "./scraper";

export async function bootstrap() {
  const scraper = new Scraper(puppeteer);

  await scraper.scrape();
}

bootstrap();
