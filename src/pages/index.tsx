import { ConnectButton } from "@rainbow-me/rainbowkit";
import Speedtest from "../components/Speedtest";
import { useReadLocalStorage } from "usehooks-ts";
import { useState } from "react";
import TestWallets from "../components/TestWallets";
import { LocalSpeedtestWallets } from "../types";
import { useNetwork } from "wagmi";

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
            {hasLocalWallets && (
              <button
                className="rounded-xl bg-white text-brand-blue font-bold p-2 mr-2 hover:bg-opacity-80"
                onClick={() => setShowTestWallets(true)}
              >
                {"SpeedTest Wallets"}
              </button>
            )}
            <ConnectButton />
          </div>
        </nav>
      </div>
      <main className="flex-1 flex flex-col">
        <Speedtest />
      </main>
      <div className="h-10 from-brand-green to-brand-green via-brand-lime bg-gradient-to-r animate-pulse" />
      <footer className="bg-brand-blue text-white">
        <div className="mx-auto container max-w-7xl px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-600 pb-6 mb-6">
            <nav>
              <h4 className="text-brand-lime font-bold">{"Products"}</h4>
              <ul className="space-y-2 mt-4">
                <li className="">
                  <a
                    rel="nofollow noreferrer"
                    href="https://docs.edennetwork.io/eden-rpc/overview"
                    className="hover:text-brand-lime"
                    target="_blank"
                  >
                    Eden RPC
                  </a>
                </li>
                <li className="">
                  <a
                    rel="nofollow noreferrer"
                    href="https://docs.edennetwork.io/eden-relay/overview"
                    className="hover:text-brand-lime"
                    target="_blank"
                  >
                    Eden Relay
                  </a>
                </li>
                <li className="">
                  <a
                    rel="nofollow noreferrer"
                    href="https://docs.edennetwork.io/eden-bundles/overview"
                    className="hover:text-brand-lime"
                    target="_blank"
                  >
                    Eden Bundles
                  </a>
                </li>
                <li className="">
                  <a
                    rel="nofollow noreferrer"
                    href="https://yieldyak.com/liquid-staking"
                    className="hover:text-brand-lime"
                    target="_blank"
                  >
                    yyAVAX on Yield Yak
                  </a>
                </li>
              </ul>
            </nav>
            <nav>
              <h4 className="text-brand-lime font-bold">{"Developers"}</h4>
              <ul className="mt-4 space-y-2">
                <li className="">
                  <a
                    href="https://docs.edennetwork.io/"
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="hover:text-brand-lime"
                  >
                    Docs
                  </a>
                </li>
                <li className="">
                  <a
                    href="https://github.com/eden-network/"
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="hover:text-brand-lime"
                  >
                    GitHub
                  </a>
                </li>
                <li className="">
                  <a
                    href="https://github.com/0xprotect"
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="hover:text-brand-lime"
                  >
                    0xProtect
                  </a>
                </li>
              </ul>
            </nav>
            <nav>
              <h4 className="text-brand-lime font-bold">{"Company"}</h4>
              <ul className="mt-4 space-y-2">
                <li className="">
                  <a
                    href="https://www.linkedin.com/company/edennetwork/"
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="hover:text-brand-lime"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </nav>
            <nav>
              <h4 className="text-brand-lime font-bold">{"Community"}</h4>
              <ul className="mt-4 space-y-2">
                <li className="">
                  <a
                    href="https://discord.gg/ZhB9mpWWG3"
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="hover:text-brand-lime"
                  >
                    Discord
                  </a>
                </li>
                <li className="">
                  <a
                    href="https://twitter.com/edennetwork"
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="hover:text-brand-lime"
                  >
                    Twitter
                  </a>
                </li>
                <li className="">
                  <a
                    href="https://medium.com/EdenNetwork"
                    target="_blank"
                    rel="nofollow noreferrer"
                    className="hover:text-brand-lime"
                  >
                    Medium
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center">
            <img src="eden-logo-white.svg" alt="Eden" className="h-8 mr-8" />
            <span className="text-gray-500 text-sm">
              &copy;{" Goe Network Ltd "}
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </footer>
      {showTestWallets && (
        <TestWallets close={() => setShowTestWallets(false)} />
      )}
    </div>
  );
}

export default Page;
