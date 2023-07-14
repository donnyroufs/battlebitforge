import { Vote } from "./vote-loadout/vote";
import { getLoadoutBySlug } from "./infra/get-loadout-by-slug";
import Image from "next/image";
import { prisma } from "@bbforge/database";
import { DeleteLoadout } from "./delete-loadout/delete-loadout";
import { getSession } from "@bbforge/auth";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function ViewLoadout(props: PageProps) {
  const slug = props.params.slug;

  const loadout = await getLoadoutBySlug(slug);
  const session = await getSession();

  async function onDelete(): Promise<void> {
    "use server";

    const session = await getSession();

    await prisma.loadouts.delete({
      where: {
        name_userId: {
          name: loadout.name,
          userId: session.user.id,
        },
      },
    });
  }

  const totalLikes = loadout.votes.reduce((acc, curr) => {
    if (curr.type === "Like") {
      acc += 1;
    }

    return acc;
  }, 0);

  const totalDislikes = loadout.votes.length - totalLikes;
  const myVote = loadout.votes.find((vote) => vote.userId === session.user?.id);
  const isOwner = Boolean(session?.user) && loadout.userId === session.user?.id;
  const isLoggedIn = Boolean(session?.user);

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-4/6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end">
          <div className="flex flex-col mt-12">
            <span className="font-bold bg-[#0A8AC5] w-fit py-1 px-3 text-white text-sm mb-1">
              {loadout.weapon.name}
            </span>
            <h2 className="text-3xl mb-8 text-[#FE9B00] uppercase font-extrabold">
              {loadout.name}
            </h2>
          </div>

          {isLoggedIn && !isOwner && (
            <Vote
              isOwner={isOwner}
              slug={slug}
              likes={totalLikes}
              dislikes={totalDislikes}
              myVote={myVote?.type ?? null}
            />
          )}
          {(!isLoggedIn || isOwner) && (
            <div className="text-gray-300 flex space-x-4 font-bold capitalize bg-[#10111A] border-[1px] border-gray-800 p-4">
              <p className="text-gray-400">{totalLikes} Good</p>
              <span className="text-gray-700 pointer-events-none">|</span>
              <p className="text-gray-400">{totalDislikes} Bad</p>
            </div>
          )}
        </div>
        <div>
          <div className="bg-[#10111A] p-12 w-full flex items-center justify-center border-gray-800 border-[1px]">
            <Image
              src={loadout.weapon.imageUrl}
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
          {isOwner && (
            <footer className="mt-8 flex">
              <div className="ml-auto">
                <DeleteLoadout loadoutName={loadout.name} onDelete={onDelete} />
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
