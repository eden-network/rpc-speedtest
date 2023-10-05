import { ConnectButton } from "@rainbow-me/rainbowkit";
import Speedtest from "../components/Speedtest";
import { useReadLocalStorage } from "usehooks-ts";
import { useEffect, useState } from "react";
import TestWallets from "../components/TestWallets";
import { LocalSpeedtestWallets } from "../types";
import { useNetwork } from "wagmi";
import Footer from "../components/Footer";

function Page() {
  const { chain } = useNetwork();
  const [showTestWallets, setShowTestWallets] = useState(false);
  const localWallets =
    useReadLocalStorage<LocalSpeedtestWallets>("speedtest.wallets");

  const hasLocalWallets = !!Object.values(localWallets || {}).some(
    (x) => x.chain === chain?.id
  );

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="bg-brand-blue text-white">
        <nav
          className="flex items-center justify-between p-4 md:px-6 mx-auto container max-w-7xl"
          aria-label="Global"
        >
          <div className="flex items-center">
            <div className="lg:flex-1 flex flex-col select-none">
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
          </div>
          <div className="flex lg:flex-1 lg:justify-end text-xs sm:text-sm whitespace-nowrap">
            {hasLocalWallets && (
              <button
                className="rounded-md bg-gradient-to-r from-brand-lime to-brand-green text-brand-blue font-bold p-2 mr-4 hover:bg-opacity-80"
                onClick={() => setShowTestWallets(true)}
              >
                {"SpeedTest Wallets"}
              </button>
            )}
            <div className="lg:block hidden">
              <ConnectButton />
            </div>
          </div>
        </nav>
      </div>
      <main className="flex-1 flex flex-col">
        <Speedtest />
      </main>
      <div className="h-1 from-brand-green to-brand-green via-brand-lime bg-gradient-to-r animate-pulse" />
      <Footer />
      {showTestWallets && (
        <TestWallets close={() => setShowTestWallets(false)} />
      )}
    </div>
  );
}

export default Page;
