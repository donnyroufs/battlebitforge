import Image from "next/image";
import { GetLoadoutsResult } from "./infra/queries/get-loadouts";
import Tooltip from "@bbforge/design-system/src/tooltip";
import Link from "next/link";

export function Loadout(props: GetLoadoutsResult[number]) {
  const totalLikes = props.votes.reduce((acc, curr) => {
    if (curr.type === "Like") {
      acc += 1;
    }

    return acc;
  }, 0);

  const totalVotes = props.votes.length;

  const percentage =
    totalVotes > 0 ? Math.round((totalLikes / totalVotes) * 100) : 0;
  const tooltipMessage =
    totalVotes > 0 ? `${percentage}% liked this` : `be the first to vote!`;

  return (
    <Link href={`/loadouts/${props.slug}`}>
      <div className="p-10 bg-[#212330]">
        <h2 className="text-2xl font-extrabold capitalize flex">
          {props.name}
        </h2>
        <Image
          src={props.weapon.imageUrl}
          height={320}
          width={320}
          alt="weapon"
          className="opacity-80 my-8 mx-auto"
        />

        <div className="relative">
          <Tooltip message={tooltipMessage}>
            <LikeOMeter likes={totalLikes} total={totalVotes} />
          </Tooltip>
        </div>
      </div>
    </Link>
  );
}

type LikeOMeterProps = {
  likes: number;
  total: number;
};

function LikeOMeter({ likes, total }: LikeOMeterProps) {
  const percentage = total > 0 ? Math.round((likes / total) * 100) : 0;

  return (
    <div className="w-full bg-[#353744] h-4">
      <div
        className={`h-4 bg-[#D35D30]`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
}
