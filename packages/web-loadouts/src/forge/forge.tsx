import { ForgeForm } from "./form";

export async function Forge() {
  return (
    <div className="">
      <div className="w-1/2 mx-auto bg-[#14181f] flex p-8 flex-col">
        <h1 className="text-3xl font-bold mb-8">Forge your loadout</h1>
        {/* <figure className="text-slate-400">
          <figcaption className="text-2xl font-bold mb-4">ACR</figcaption>
          <Image src="/ACR.png" alt="ACR weapon" width="320" height="320" />
        </figure> */}
        <ForgeForm />
      </div>
    </div>
  );
}
