import Image from "next/image";
import { GetLoadoutsResult } from "./infra/queries/get-loadouts";
import Tooltip from "@bbforge/design-system/src/tooltip";
import Link from "next/link";

export function Loadout(props: GetLoadoutsResult[number]) {
  return (
    <div className="p-10 bg-[#212330]">
      <Link href={`/loadouts/${props.slug}`}>
        <h2 className="text-2xl font-extrabold capitalize flex">
          {props.name}
        </h2>
      </Link>
      <Image
        src="/ACR.png"
        height={320}
        width={320}
        alt="weapon"
        className="opacity-70 my-8 mx-auto"
      />

      <div className="relative">
        <Tooltip message="a loadout hot-o-meter">
          <div className="w-full bg-[#353744] h-4">
            <div className="h-4 w-4/6 bg-[#D35D30]"></div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
