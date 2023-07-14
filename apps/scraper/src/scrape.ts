import { attachmentsMap } from "./mappers/attachment-map";
import { slotMap } from "./mappers/slot-map";

export function scrape(dom: Document) {
  const slots = Array.from(dom.querySelectorAll(".wds-tabs__tab"));
  const contents = Array.from(dom.querySelectorAll(".wds-tab__content"));

  const slotsCount = slots.length;
  const contentsCount = contents.length;

  if (slotsCount !== contentsCount) {
    console.error("Slots and content do not match");
  }

  const result: { slot: string; attachments: string[] }[] = [];

  for (let i = 0; i < slotsCount; i++) {
    const slot = slots[i];
    const content = contents[i];

    const slotNameRaw = slot.querySelector(".wds-tabs__tab-label a")!.innerHTML;
    const slotName =
      slotMap[slotNameRaw as keyof typeof slotMap] ?? slotNameRaw;

    const attachments: Element[] = [];

    attachments.push(
      ...Array.from(content.querySelectorAll("p > a, span"))
        .filter((item) => !item.innerHTML.includes("mw-editsection-bracket"))
        .filter((item) => !item.innerHTML.includes("["))
        .filter((item) => !item.innerHTML.includes("]"))
        .filter((item) => !item.classList.contains("mw-headline"))
    );

    if (attachments.length === 0) {
      attachments.push(
        ...Array.from(content.querySelectorAll("li"))
          .filter((item) => !item.innerHTML.includes("mw-editsection-bracket"))
          .filter((item) => !item.innerHTML.includes("["))
          .filter((item) => !item.innerHTML.includes("]"))
          .filter((item) => !item.classList.contains("mw-headline"))
      );
    }

    result.push({
      slot: slotName,
      attachments: attachments
        .map((item) => item.textContent!)
        .map(deleteNumberParentheses)
        .map((item) => item.trim())
        .map(
          (item) => attachmentsMap[item as keyof typeof attachmentsMap] ?? item
        ),
    });
  }

  return result;
}

const deleteNumberParentheses = (str: string): string =>
  str.replace(/\(\d+\)/, "");

const removeTrailingEqual = (str: string): string => {
  if (str.endsWith("=")) {
    return str.slice(0, -1);
  }

  return str;
};

const sleep = () => new Promise((res) => setTimeout(res, 100));
