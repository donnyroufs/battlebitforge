import { MyLoadouts } from "@bbforge/loadouts";
import { Logout } from "@bbforge/auth";
import { Button } from "@bbforge/design-system";

export default async function Page() {
  return (
    <>
      <div className="container mx-auto">
        <header className="text-slate-200 flex justify-between items-center h-32">
          <p className="text-2xl font-semibold">Battlebit Forge</p>
          <div className="space-x-4">
            <Button variant="primary">Forge Loadout</Button>
            <Logout />
          </div>
        </header>
        <MyLoadouts />
      </div>
    </>
  );
}
