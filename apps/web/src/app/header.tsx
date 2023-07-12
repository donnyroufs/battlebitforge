import { Logout } from "@bbforge/auth";
import { Button } from "@bbforge/design-system";
import { version } from "../../package.json";

export function Header() {
  return (
    <header className="text-slate-300 flex justify-between items-center h-32">
      <p className="text-2xl font-semibold flex items-center">
        Battlebit Forge
        <span className="bg-slate-700 text-slate-300 text-xs font-medium mr-2 px-2.5 py-0.5 rounded ml-2 mt-2 pointer-events-none">
          v{version}
        </span>
      </p>
      <div className="space-x-4">
        <Button variant="primary">Forge Loadout</Button>
        <Logout />
      </div>
    </header>
  );
}
