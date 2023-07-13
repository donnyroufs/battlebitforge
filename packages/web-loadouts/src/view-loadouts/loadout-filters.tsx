"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export type LoadoutFilterProps = {
  filterableWeapons: { id: number; name: string }[];
  filterBy: "all" | string;
};

export function LoadoutFilters(props: LoadoutFilterProps) {
  const router = useRouter();
  const [filterBy, setFilterBy] = useState<"all" | string>(props.filterBy);

  function onChange(value: string): void {
    setFilterBy(value);
    router.push("/?filterBy=" + value);
  }

  return (
    <select
      className="py-2 px-4 bg-[#212330] mt-2 min-w-[128px] md:min-w-[256px] h-12 p-2"
      value={filterBy}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="all">All Weapons</option>
      {props.filterableWeapons.map((weapon) => (
        <option key={weapon.id} value={weapon.name}>
          {weapon.name}
        </option>
      ))}
    </select>
  );
}
