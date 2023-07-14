export type ScrapedWeapon = {
  name: string;
  type: string;
  attachments: { slot: string; attachments: string[] }[];
};
