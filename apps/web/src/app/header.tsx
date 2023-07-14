import { Logout } from "@bbforge/auth";
import NextLink from "next/link";
import { version } from "../../package.json";
import { Link } from "@bbforge/design-system";

export function Header() {
  return (
    <>
      <header className="text-[#DAE2EB] justify-between items-center h-32 hidden md:flex">
        <div>
          <span className="uppercase mb-4 font-extrabold">v{version}</span>
          <a href="/">
            <p className="text-3xl flex items-center uppercase font-extrabold">
              Battlebit Forge
            </p>
          </a>
        </div>
        <div className="flex items-center">
          <nav className="mr-8">
            <Link variant="ghost" href="/my-loadouts">
              My Loadouts
            </Link>
          </nav>
          <div className="space-x-4">
            <Link href="/forge" variant="primary">
              Forge Loadout
            </Link>
            <Logout />
          </div>
        </div>
      </header>
      <header className="text-[#DAE2EB] justify-between items-center h-32 flex md:hidden">
        <div>
          <span className="uppercase mb-4 font-extrabold">v{version}</span>
          <NextLink href="/">
            <p className="text-3xl flex items-center uppercase font-extrabold">
              Battlebit Forge
            </p>
          </NextLink>
        </div>
        <Logout />
      </header>
    </>
  );
}
