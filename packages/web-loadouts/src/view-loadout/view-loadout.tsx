import { getServerSession } from "next-auth";
import { Vote } from "./vote-loadout/vote";
import { MdDelete } from "react-icons/md";
import { getLoadoutBySlug } from "./infra/get-loadout-by-slug";
import Image from "next/image";
import { prisma } from "@bbforge/database";
import { Button } from "@bbforge/design-system";
import { DeleteLoadout } from "./delete-loadout/delete-loadout";

type ViewLoadoutProps = {
  slug: string;
};

export async function ViewLoadout(props: ViewLoadoutProps) {
  const loadout = await getLoadoutBySlug(props.slug);
  const session = await getServerSession();
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  const totalLikes = loadout.votes.reduce((acc, curr) => {
    if (curr.type === "Like") {
      acc += 1;
    }

    return acc;
  }, 0);

  const totalDislikes = loadout.votes.length - totalLikes;
  const myVote = loadout.votes.find((vote) => vote.userId === user.id);
  const isOwner = loadout.userId === user.id;

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-4/6">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col mt-12">
            <span className="font-bold bg-[#0A8AC5] w-fit py-1 px-3 text-white text-sm mb-1">
              {loadout.weapon.name}
            </span>
            <h2 className="text-3xl mb-8 text-[#FE9B00] uppercase font-extrabold">
              {loadout.name}
            </h2>
          </div>
          <Vote
            isOwner={isOwner}
            slug={props.slug}
            likes={totalLikes}
            dislikes={totalDislikes}
            myVote={myVote?.type ?? null}
          />
        </div>
        <div>
          <div className="bg-[#10111A] p-12 w-full flex items-center justify-center border-gray-800 border-[1px]">
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
          {isOwner && false && (
            <footer className="mt-8 flex">
              <div className="ml-auto">
                <DeleteLoadout />
              </div>
            </footer>
          )}
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
