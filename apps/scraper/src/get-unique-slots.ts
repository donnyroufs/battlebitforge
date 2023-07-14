import { ScrapedWeapon } from "./scraped-weapon";

export function getUniqueSlots(weapons: ScrapedWeapon[]) {
  return Array.from(
    new Set(weapons.flatMap((weapon) => weapon.attachments).map((x) => x.slot))
  );
}
