import type puppeteer from "puppeteer";

type ParsedWeapon = {
  name: string;
  detailUrl: string;
  rank: number;
  image: string;
};

type ParsedAttachment = {
  name: string;
};

type ParsedItem = {
  weapon: ParsedWeapon;
  attachments: ParsedAttachment[];
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
      const tables = Array.from(document.querySelectorAll("table"));
      // The last two tables are different and not related at all
      tables.splice(-2);

      const weapons: ParsedWeapon[] = [];
      for (const table of tables) {
        const rows = table.querySelectorAll("tbody tr");

        const items = Array.from(rows).map((row) => {
          return Array.from(row.querySelectorAll("td")).map((item) => {
            return item.innerHTML;
          });
        });

        const parser = new DOMParser();
        const parsedResult = items.map((item) => {
          // This is the first item which also includes the weapon roles
          if (item.length > 5) {
            const [nameEl, imageEl, _, rankEl] = item;

            return <ParsedWeapon>{
              name:
                parser.parseFromString(nameEl, "text/html").querySelector("a")
                  ?.innerText ?? "",
              detailUrl:
                parser.parseFromString(nameEl, "text/html").querySelector("a")
                  ?.href ?? "",
              image:
                parser
                  .parseFromString(imageEl, "text/html")
                  .querySelector("img")
                  ?.getAttribute("data-src") ??
                parser
                  .parseFromString(imageEl, "text/html")
                  .querySelector("img")!.src,
              rank: Number(rankEl.replace(/\n/g, "")),
            };
          } else {
            const [nameEl, imageEl, rankEl] = item;
            return <ParsedWeapon>{
              name:
                parser.parseFromString(nameEl, "text/html").querySelector("a")
                  ?.innerText ?? "",
              detailUrl:
                parser.parseFromString(nameEl, "text/html").querySelector("a")
                  ?.href ?? "",
              image:
                parser
                  .parseFromString(imageEl, "text/html")
                  .querySelector("img")
                  ?.getAttribute("data-src") ??
                parser
                  .parseFromString(imageEl, "text/html")
                  .querySelector("img")!.src,
              rank: Number(rankEl.replace(/\n/g, "")),
            };
          }
        });

        weapons.push(...parsedResult);
      }

      return weapons;
    })!;

    const final: ParseResult = [];

    for (const weapon of result) {
      await page.goto(weapon.detailUrl);
      const res = await page.evaluate(() => {
        const contents = Array.from(
          document.querySelectorAll(".wds-tab__content a")
        );
        const spanContents = Array.from(
          document.querySelectorAll(".wds-tab__content span")
        );
        const liContents = Array.from(
          document.querySelectorAll(".wds-tab__content li")
        );

        // TODO: make sure that span and li contents do not have any children, we are still getting html values.
        // return contents
        //   .concat(spanContents)
        //   .concat(liContents)
        //   .map((content) => content.innerHTML);

        // For now we only grab attachments that have a link. They appear valid
        return contents.map((x) => x.innerHTML);
      });

      final.push({
        weapon,
        attachments: res.map((name) => ({ name })),
      });
    }

    await browser.close();

    return final;
  }
}
