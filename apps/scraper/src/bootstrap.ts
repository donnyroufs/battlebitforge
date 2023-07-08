import puppeteer from "puppeteer";
import fs from "fs";
import { Scraper } from "./scraper";

export async function bootstrap() {
  const scraper = new Scraper(puppeteer);

  const result = await scraper.scrape();
}

bootstrap();
