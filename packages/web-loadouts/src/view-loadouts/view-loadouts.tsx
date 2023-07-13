import { getFilterableWeapons } from "./infra/queries/get-filterable-weapons";
import { getLoadouts } from "./infra/queries/get-loadouts";
import { LoadoutFilters } from "./loadout-filters";
import { Loadouts } from "./loadouts";

type PageProps = {
  searchParams: {
    filterBy?: string;
  };
};

export async function ViewLoadouts(props: PageProps) {
  const filterBy = props.searchParams?.filterBy ?? "all";
  const filterableWeapons = await getFilterableWeapons();
  const loadouts = await getLoadouts(filterBy);

  return (
    <>
      <div className="flex justify-between items-center mb-4 mt-8">
        <h2 className="text-3xl mb-8 text-[#FE9B00] uppercase font-extrabold mt-8">
          Loadouts
        </h2>
        <LoadoutFilters
          filterableWeapons={filterableWeapons}
          filterBy={filterBy}
        />
      </div>
      <Loadouts filterBy={filterBy} loadouts={loadouts} />
    </>
  );
}
