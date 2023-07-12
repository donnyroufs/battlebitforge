import { getLoadouts } from "./infra/queries/get-loadouts";
import { Loadout } from "./loadout";

type LoadoutsProps = {
  filterBy: "all" | string;
};

export async function Loadouts(props: LoadoutsProps) {
  const loadouts = await getLoadouts(props.filterBy);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loadouts.map((loadout) => (
        <Loadout {...loadout} key={loadout.id} />
      ))}
    </div>
  );
}
