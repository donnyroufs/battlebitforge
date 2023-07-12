import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@bbforge/database";
import { ForgeLoadoutDto } from "../schema";
import slugify from "slugify";

export async function forgeLoadout(request: Request) {
  const session = await getServerSession();
  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  const body = (await request.json()) as ForgeLoadoutDto;

  const loadout = await prisma.loadouts.create({
    data: {
      name: body.name,
      userId: user.id,
      slug: slugify(body.name, {
        lower: true,
        trim: true,
      }),
      weaponsId: +body.weapon,
    },
  });

  await prisma.loadoutItems.createMany({
    data: body.selected.filter(Boolean).map((selected) => ({
      loadoutId: loadout.id,
      weaponSlotAttachmentsId: selected,
    })),
  });

  return NextResponse.json({ id: loadout.id }, { status: 201 });
}
