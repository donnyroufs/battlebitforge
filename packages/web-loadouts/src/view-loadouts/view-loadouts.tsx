import { getFilterableWeapons } from "./infra/queries/get-filterable-weapons";
import { LoadoutFilters } from "./loadout-filters";
import { Loadouts } from "./loadouts";

type ViewLoadoutsProps = {
  filterBy: "all" | string;
};

export async function ViewLoadouts(props: ViewLoadoutsProps) {
  const filterableWeapons = await getFilterableWeapons();

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-3xl mb-8 text-[#FE9B00] uppercase font-extrabold mt-8">
          Loadouts
        </h2>
        <LoadoutFilters
          filterableWeapons={filterableWeapons}
          filterBy={props.filterBy}
        />
      </div>
      <Loadouts filterBy={props.filterBy} />
    </>
  );
}
