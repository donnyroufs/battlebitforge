import { GetLoadoutsResult, getLoadouts } from "./infra/queries/get-loadouts";
import { Loadout } from "./loadout";

type LoadoutsProps = {
  filterBy: "all" | string;
  loadouts: GetLoadoutsResult;
};

export function Loadouts(props: LoadoutsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {props.loadouts.map((loadout) => (
        <Loadout {...loadout} key={loadout.id} />
      ))}
    </div>
  );
}
