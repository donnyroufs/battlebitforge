import { ScrapedWeapon } from "./scraped-weapon";

export function getUniqueAttachments(weapons: ScrapedWeapon[]): string[] {
  const attachments = weapons.flatMap((weapon) =>
    weapon.attachments.flatMap((attachment) => attachment.attachments)
  );
  const uniqAttachments = Array.from(new Set(attachments));
  return [...uniqAttachments].sort((a, b) => a.localeCompare(b));
}
