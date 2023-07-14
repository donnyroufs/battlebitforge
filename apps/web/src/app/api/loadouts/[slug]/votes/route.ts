import { getSession } from "@bbforge/auth";
import { prisma } from "@bbforge/database";
import { LoadoutVote } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: any) {
  const slug = params.slug;
  const voteType = request.nextUrl.searchParams.get("type");
  const vote = voteType === "like" ? LoadoutVote.Like : LoadoutVote.Dislike;
  const session = await getSession();

  const loadout = await prisma.loadouts.findUnique({
    where: {
      slug,
    },
  });

  await prisma.loadoutVotes.upsert({
    where: {
      userId_loadoutsId: {
        userId: session.user.id,
        loadoutsId: loadout.id,
      },
    },
    create: {
      userId: session.user.id,
      loadoutsId: loadout.id,
      type: vote,
    },
    update: {
      type: vote,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
