export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row p-4 mb-8 mt-8 md:mt-auto justify-between gap-2 md:gap-0 border-t-[1px] border-gray-800 ">
      <div className="">
        <h3 className="text-[#DAE2EB] font-black text-lg mt-4">Data Sources</h3>
        <ul className="mt-4 text-gray-400">
          <li>
            <a
              href="https://battlebit.fandom.com/wiki/BattleBit_Wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Battlebit Fandom Wiki
            </a>
          </li>
        </ul>
      </div>
      <div className="flex items-end text-gray-400">
        <p>© 2023 Donny Roufs. All rights reserved.</p>
      </div>
    </footer>
  );
}
