import { JSDOM } from "jsdom";
import fs from "fs";
import { scrape } from "./scrape";
import { ScrapedWeapon } from "./scraped-weapon";
import { getUniqueAttachments } from "./get-unique-attachments";
import { getUniqueSlots } from "./get-unique-slots";

const weapons: ScrapedWeapon[] = [
  { name: "AK-74", type: "Assault Rifles", attachments: [] },
  { name: "M4A1", type: "Assault Rifles", attachments: [] },
  { name: "AK-15", type: "Assault Rifles", attachments: [] },
  { name: "SCAR-H", type: "Assault Rifles", attachments: [] },
  { name: "AUG A3", type: "Assault Rifles", attachments: [] },
  { name: "SG550", type: "Assault Rifles", attachments: [] },
  { name: "FAMAS", type: "Assault Rifles", attachments: [] },
  { name: "ACR", type: "Assault Rifles", attachments: [] },
  { name: "G36C", type: "Assault Rifles", attachments: [] },
  { name: "HK419", type: "Assault Rifles", attachments: [] },
  { name: "FAL", type: "Assault Rifles", attachments: [] },
  { name: "AK5C", type: "Assault Rifles", attachments: [] },
  { name: "MP7", type: "Submachine Guns", attachments: [] },
  { name: "UMP-45", type: "Submachine Guns", attachments: [] },
  { name: "PP-2000", type: "Submachine Guns", attachments: [] },
  { name: "PP19", type: "Submachine Guns", attachments: [] },
  { name: "Kriss Vector", type: "Submachine Guns", attachments: [] },
  { name: "MP5", type: "Submachine Guns", attachments: [] },
  { name: "Honey Badger", type: "Personal Defense Weapons", attachments: [] },
  { name: "Groza", type: "Personal Defense Weapons", attachments: [] },
  { name: "P90", type: "Personal Defense Weapons", attachments: [] },
  { name: "AS Val", type: "Carbines", attachments: [] },
  { name: "Scorpion EVO", type: "Carbines", attachments: [] },
  { name: "L86A1", type: "Light Support Guns", attachments: [] },
  { name: "MG36", type: "Light Support Guns", attachments: [] },
  { name: "M249", type: "Light Machine Guns", attachments: [] },
  { name: "Ultimax 100", type: "Light Machine Guns", attachments: [] },
  { name: "MK-20", type: "Designated Marksman Rifles", attachments: [] },
  { name: "M110", type: "Designated Marksman Rifles", attachments: [] },
  { name: "MK-14 EBR", type: "Designated Marksman Rifles", attachments: [] },
  { name: "SVD", type: "Designated Marksman Rifles", attachments: [] },
  { name: "SSG 69", type: "Sniper Rifles", attachments: [] },
  { name: "SV-98", type: "Sniper Rifles", attachments: [] },
  { name: "L96", type: "Sniper Rifles", attachments: [] },
  { name: "REM700", type: "Sniper Rifles", attachments: [] },
  { name: "M200", type: "Sniper Rifles", attachments: [] },
  { name: "MSR", type: "Sniper Rifles", attachments: [] },
  { name: "M9", type: "Pistols", attachments: [] },
  { name: "MP443", type: "Pistols", attachments: [] },
  { name: "USP", type: "Pistols", attachments: [] },
  { name: "Glock 18", type: "Pistols", attachments: [] },
  { name: "Unica", type: "Pistols", attachments: [] },
  { name: "Desert Eagle", type: "Pistols", attachments: [] },
  { name: "RSH12", type: "Pistols", attachments: [] },
];

function createUrl(weaponName: string) {
  return `https://battlebit.fandom.com/wiki/${weaponName}`;
}

type GetDocumentResult =
  | {
      type: "found";
      dom: Document;
    }
  | { type: "not-found" };

async function getDocument(weaponName: string): Promise<GetDocumentResult> {
  const res = await fetch(createUrl(weaponName));
  const html = await res.text();
  const jd = new JSDOM(html);
  const dom = jd.window.document;

  if (!dom || !Boolean(dom.querySelector(".mw-page-title-main"))) {
    return {
      type: "not-found",
    };
  }

  return {
    type: "found",
    dom,
  };
}

async function run() {
  console.time("scraping");
  for (const weapon of weapons) {
    if (["AK-74", "AK5C"].includes(weapon.name)) {
      console.log("ignoring", weapon.name);
      continue;
    }

    const res = await getDocument(weapon.name);

    switch (res.type) {
      case "not-found":
        console.error("failed to find:", weapon.name);
        break;
      case "found":
        const result = scrape(res.dom);
        weapon.attachments.push(...result);
        break;
    }
  }

  const attachments = getUniqueAttachments(weapons);
  const slots = getUniqueSlots(weapons);
  const now = Date.now();
  const fileDir = `./data/${now}`;

  fs.mkdirSync(fileDir);
  fs.writeFileSync(fileDir + "/weapons.json", JSON.stringify(weapons, null, 2));
  fs.writeFileSync(
    fileDir + "/attachments.json",
    JSON.stringify(attachments, null, 2)
  );
  fs.writeFileSync(fileDir + "/slots.json", JSON.stringify(slots, null, 2));
  fs.writeFileSync(
    fileDir + "/seed.json",
    JSON.stringify(
      {
        weapons,
        attachments,
        slots,
        createdAt: now,
      },
      null,
      2
    )
  );
  console.timeEnd("scraping");
}

run();
