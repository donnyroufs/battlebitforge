import { getLoadoutBySlug } from "./infra/get-loadout-by-slug";
import Image from "next/image";

type ViewLoadoutProps = {
  slug: string;
};

export async function ViewLoadout(props: ViewLoadoutProps) {
  const loadout = await getLoadoutBySlug(props.slug);

  console.log(loadout);
  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="flex flex-col mt-12">
          <span className="font-bold bg-[#0A8AC5] w-fit py-1 px-3 text-white text-sm mb-1">
            {loadout.weapon.name}
          </span>
          <h2 className="text-3xl mb-8 text-[#FE9B00] uppercase font-extrabold">
            {loadout.name}
          </h2>
        </div>
        <div>
          <div className="bg-[#10111A] p-12 max-w-2xl flex items-center justify-center border-gray-800 border-[1px]">
            <Image
              src="/ACR.png"
              height={240}
              width={240}
              alt="weapon"
              className="opacity-80"
            />
          </div>
          <div>
            {[...loadout.items]
              .sort((a, b) => a.slotName.localeCompare(b.slotName))
              .map((item) => (
                <Attachment
                  slot={item.slotName}
                  attachment={item.attachmentName}
                  key={item.slotName}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

type AttachmentProps = {
  slot: string;
  attachment: string | null;
};

function Attachment(props: AttachmentProps) {
  return (
    <div className="bg-[#10111A] p-4 border-gray-800 border-[1px]">
      <h3 className="font-bold text-lg text-[#FE9B00]">{props.slot}</h3>
      <p className="text-slate-400">{props.attachment ?? "None"}</p>
    </div>
  );
}