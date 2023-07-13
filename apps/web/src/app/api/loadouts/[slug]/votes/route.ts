import { prisma } from "@bbforge/database";
import { LoadoutVote } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// TODO: add user id to session
export async function POST(request: NextRequest, { params }: any) {
  const slug = params.slug;
  const voteType = request.nextUrl.searchParams.get("type");
  const vote = voteType === "like" ? LoadoutVote.Like : LoadoutVote.Dislike;
  const session = await getServerSession();

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  const loadout = await prisma.loadouts.findFirst({
    where: {
      slug,
    },
  });

  await prisma.loadoutVotes.upsert({
    where: {
      userId_loadoutsId: {
        userId: user.id,
        loadoutsId: loadout.id,
      },
    },
    create: {
      userId: user.id,
      loadoutsId: loadout.id,
      type: vote,
    },
    update: {
      type: vote,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
