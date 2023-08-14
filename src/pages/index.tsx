import { ConnectButton } from "@rainbow-me/rainbowkit";
import Speedtest from "../components/Speedtest";
import { useReadLocalStorage } from "usehooks-ts";

function Page() {
  const localWallets =
    useReadLocalStorage<Record<`0x${string}`, `0x${string}`>>(
      "speedtest.wallets"
    );

  const hasLocalWallets = !!Object.keys(localWallets || {}).length;
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="bg-brand-blue text-white">
        <nav
          className="flex items-center justify-between p-4 mx-auto container max-w-7xl"
          aria-label="Global"
        >
          <div className="lg:flex-1 flex flex-col">
            <h1 className="font-bold mr-2 text-base sm:text-lg md:text-xl text-white">
              {"RPC Speed Test"}
            </h1>
            <span className="inline-flex text-indigo-50 text-xs items-center">
              <span>{"Powered by"}</span>
              <img
                src="eden-logo-white.svg"
                alt="Eden"
                className="h-4 ml-1 mb-px"
              />
            </span>
          </div>

          <div className="flex lg:flex-1 lg:justify-end text-xs sm:text-sm">
            {hasLocalWallets && "Wallets"}
            <ConnectButton />
          </div>
        </nav>
      </div>
      <main className="flex-1 flex flex-col">
        <Speedtest />
      </main>
      <footer className="bg-brand-blue">
        <div className="flex mx-auto container max-w-7xl p-4">
          <img src="eden-logo-white.svg" alt="Eden" className="h-8" />
        </div>
      </footer>
    </div>
  );
}

export default Page;
