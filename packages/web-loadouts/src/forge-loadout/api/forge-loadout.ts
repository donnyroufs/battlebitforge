import { NextResponse } from "next/server";
import { prisma } from "@bbforge/database";
import { ForgeLoadoutDto } from "../schema";
import slugify from "slugify";
import { getSession } from "@bbforge/auth";

export async function forgeLoadout(request: Request) {
  const session = await getSession();

  const body = (await request.json()) as ForgeLoadoutDto;

  try {
    const loadout = await prisma.loadouts.create({
      data: {
        name: body.name,
        userId: session.user.id,
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

    return NextResponse.json(
      { id: loadout.id, slug: loadout.slug },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.code }, { status: 400 });
  }
}
