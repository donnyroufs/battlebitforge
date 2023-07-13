"use client";
import "./styles.css";
import { useState } from "react";
import { LoadoutVote } from "@prisma/client";
import { useRouter } from "next/navigation";

type VoteProps = {
  likes: number;
  dislikes: number;
  myVote: LoadoutVote | null;
  slug: string;
  isOwner: boolean;
};

export function Vote(props: VoteProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onVote(type: LoadoutVote): Promise<void> {
    if (props.isOwner) return;

    setLoading(true);
    const res = await fetch(
      `/api/loadouts/${props.slug}/votes?type=${type.toLocaleLowerCase()}`,
      {
        method: "POST",
        cache: "no-cache",
      }
    );

    if (res.ok) {
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <div className="">
      <button
        disabled={loading || props.isOwner}
        className={`bg-[#1C1E29] hover:opacity-80 p-2 w-24 border-gray-800 border-[1px] font-bold ${
          props.myVote === LoadoutVote.Like && "liked"
        }`}
        onClick={() => onVote("Like")}
      >
        Good ({props.likes})
      </button>
      <button
        disabled={loading || props.isOwner}
        className={`bg-[#1C1E29] hover:opacity-80 p-2 w-24 border-gray-800 border-[1px] font-bold ${
          props.myVote === LoadoutVote.Dislike && "disliked"
        }`}
        onClick={() => onVote("Dislike")}
      >
        Bad ({props.dislikes})
      </button>
    </div>
  );
}
