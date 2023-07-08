import type puppeteer from "puppeteer";
import fs from "fs";

type ParsedWeapon = {
  name: string;
  rank: number;
  image: string;
};

type ParsedAttachment = {
  name: string;
};

type ParsedItem = {
  weapon: ParsedWeapon;
  attachment: ParsedAttachment;
};

type ParseResult = ParsedItem[];

export class Scraper {
  public constructor(private readonly _puppeteer: typeof puppeteer) {}

  public async scrape(): Promise<ParsedItem[]> {
    const browser = await this._puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto("https://battlebit.fandom.com/wiki/Weapons");
    const result = await page.evaluate(() => {
      const table = document.querySelector("table");

      if (!table) {
        throw new Error("found no table");
      }

      const rows = table.querySelectorAll("tbody tr");

      const items = Array.from(rows).map((row) => {
        return Array.from(row.querySelectorAll("td")).map((item) => {
          return item.innerHTML;
        });
      });

      const parser = new DOMParser();
      return items.map((item) => {
        // This is the first item which also includes the weapon roles
        if (item.length > 5) {
          const [nameEl, imageEl, _, rankEl] = item;

          return <ParsedWeapon>{
            name:
              parser.parseFromString(nameEl, "text/html").querySelector("a")
                ?.innerText ?? "",
            image:
              parser
                .parseFromString(imageEl, "text/html")
                .querySelector("img")
                ?.getAttribute("data-src") ??
              parser.parseFromString(imageEl, "text/html").querySelector("img")!
                .src,
            rank: Number(rankEl.replace(/\n/g, "")),
          };
        } else {
          const [nameEl, imageEl, rankEl] = item;
          return <ParsedWeapon>{
            name:
              parser.parseFromString(nameEl, "text/html").querySelector("a")
                ?.innerText ?? "",
            image:
              parser
                .parseFromString(imageEl, "text/html")
                .querySelector("img")
                ?.getAttribute("data-src") ??
              parser.parseFromString(imageEl, "text/html").querySelector("img")!
                .src,
            rank: Number(rankEl.replace(/\n/g, "")),
          };
        }
      });
    });

    await browser.close();

    console.log(result);
    return [];
  }

  private onRow(row: HTMLElement): HTMLElement[] {
    return Array.from(row.querySelectorAll("td"));
  }

  private onCell(cell: HTMLElement): string {
    return cell!.querySelector("a")!.innerHTML;
  }
}
