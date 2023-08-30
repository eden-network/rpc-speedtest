import React, { useEffect, useState } from "react";
import { mainnet, useNetwork } from "wagmi";
import ResultsTable from "./ResultsTable";
import RPCs from "./RPCs";
import Details from "./Details";
import { getRpcUrls } from "../core/rpcs";
import useSpeedTest from "../hooks/useSpeedTest";
import Spinner from "./Spinner";
import { formatNumber } from "../utils/formatNumber";
import { formatEther } from "ethers/lib/utils.js";
import RankingsTable from "./RankingsTable";
import { scrollToBottom } from "../utils/scrollToBottom";
import { useLocalStorage } from "usehooks-ts";
import { LocalSpeedtestWallets } from "../types";
import CleanupTable from "./CleanupTable";

function getCurrentIteration(
  loopCount: number,
  itemsToLoop: number,
  results: number
): number {
  // if (results === 0 || results === itemsToLoop) return 1;
  const itemsPerIteration = Math.ceil(itemsToLoop / loopCount);
  const currentIteration = Math.floor(results / itemsPerIteration);
  if (currentIteration === 0) return 1;

  return Math.min(currentIteration + 1, loopCount);
}

const Speedtest: React.FC = () => {
  const [loops, setLoops] = useState(() => 4);
  const [delay, setDelay] = useState(() => 13);
  const { chain: activeChain } = useNetwork();
  const chain = activeChain || mainnet;
  const [rpcUrls, setRpcUrls] = useState(getRpcUrls(chain.id));
  const [rpcKey, setRpcKey] = useState(chain.id);

  const [localWallets, setLocalWallets] =
    useLocalStorage<LocalSpeedtestWallets>("speedtest.wallets", {});

  const {
    initialWallet,
    results,
    reset,
    sendTransaction,
    status,
    totalAmount,
    transferPrice,
    wallets,
    cleanupTxs,
  } = useSpeedTest({
    chain,
    delay,
    loops,
    rpcUrls,
  });

  useEffect(() => {
    setRpcUrls(getRpcUrls(chain.id));
    // ensure RPCs list is refreshed
    setRpcKey(chain.id);
  }, [chain.id]);

  useEffect(() => {
    // any time new result comes in
    if (!!results.length) {
      scrollToBottom();
    }
  }, [results]);

  return (
    <div className="Speedtest flex-1 flex flex-col">
      <h1 className="mx-auto text-brand-blue text-4xl font-bold p-6">Take charge and Discover the Ultimate RPC Speed Data</h1>
      <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 px-4 md:px-6 py-4 md:py-8">
        <section className="">
          <RPCs rpcCount={rpcUrls.length} key={rpcKey} urls={rpcUrls} setUrls={setRpcUrls} />
        </section>
        <section className="">
          <Details
            chain={chain}
            initialWallet={initialWallet}
            loops={loops}
            setLoops={setLoops}
            delay={delay}
            setDelay={setDelay}
            rpcCount={rpcUrls.length}
            totalCost={totalAmount}
            transferCost={transferPrice}
            wallets={wallets}
          />
        </section>
      </div>
      <div className="text-brand-blue flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {status === "idle" && (
            <div className="w-full flex-col flex items-center justify-center">
              <button
                className="rounded-full bg-gradient-eden px-4 py-2.5 text-2xl font-semibold text-black shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-75"
                type="button"
                onClick={() => {
                  setLocalWallets({
                    ...localWallets,
                    [initialWallet.address]: {
                      privKey: initialWallet.privateKey,
                      chain: chain.id,
                    },
                  });
                  sendTransaction?.();
                }}
                disabled={!initialWallet || !rpcUrls.length}
              >
                {"Start Speed Test"}
              </button>
              <h1 className="mt-6 text-brand-blue text-center mb-12">
                {`Beginning the test will transfer ${formatNumber(
                  Number(formatEther(totalAmount)),
                  { maximumSignificantDigits: 2 }
                )} ${chain.nativeCurrency.symbol
                  } to the Genesis Wallet, create ${rpcUrls.length
                  } SpeedTest wallets, and send  ${loops} transactions from each.`}
              </h1>
            </div>
          )}
          {(status === "seeding" || status === "starting") && (
            <p className="w-full flex items-center justify-center text-xl">
              <span className="mr-4">
                {status === "starting"
                  ? "Funding Genesis Wallet"
                  : `Funding SpeedTest wallet ${Math.min(
                    wallets.length + 1,
                    rpcUrls.length
                  )} of ${rpcUrls.length}`}
              </span>
              <Spinner />
            </p>
          )}
          {(status === "running" ||
            status === "success" ||
            status === "cleaning") && (
              <div className="mb-6 flex-1 space-y-6 max-w-full">
                <ResultsTable chain={chain} results={results} />
                <RankingsTable chain={chain} results={results} />
                <CleanupTable chain={chain} txData={cleanupTxs} />

                <p className="w-full flex items-center justify-center text-xl">
                  {status === "running" && (
                    <>
                      <span className="mr-4 text-base">
                        {`Running SpeedTest loop ${getCurrentIteration(
                          loops,
                          rpcUrls.length * loops,
                          results.length
                        )} of ${loops}`}
                      </span>
                      <Spinner />
                    </>
                  )}
                  {status === "cleaning" && (
                    <>
                      <span className="mr-4">{"Running wallet cleanup"}</span>
                      <Spinner />
                    </>
                  )}

                  {status === "success" && (
                    <span className="flex items-center space-x-4">
                      <button
                        onClick={() => reset()}
                        className="flex-none text-sm font-medium ml-2 bg-white rounded-full px-3 py-1 text-indigo-600 hover:bg-indigo-100"
                      >
                        {"Clear Results"}
                      </button>
                      <button
                        onClick={() => {
                          reset();
                          sendTransaction?.();
                        }}
                        className="flex-none text-sm font-medium ml-2 bg-white rounded-full px-3 py-1 text-indigo-600 hover:bg-indigo-100"
                      >
                        {"Run Again"}
                      </button>
                    </span>
                  )}
                </p>
              </div>
            )}
        </div>
      </div>
      <div id="scrollAnchor" />
      <div className="h-1 from-brand-green to-brand-green via-brand-lime bg-gradient-to-r animate-pulse" />
      <div className="bg-[url('../public/eden-background.png')] bg-brand-blue bg-center bg-cover py-20">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 px-4 md:px-6 py-4 md:py-8">
          <div className="flex-1 bg-white p-6 rounded-2xl">
            <legend className="text-base text-xl font-semibold leading-6 text-gray-900 pb-4">
              Instructions
            </legend>
            <ol className="list-decimal px-5 pt-4">
              <li>Connect your wallet</li>
              <li>
                Select a network that supports the RPC Speed Test (Ethereum,
                Arbitrum, Avalanche, Polygon Mumbai)
              </li>
              <li>
                Select the RPCs you want to test, and/or add your own by clicking
                &apos;+ Custom RPC&apos;
              </li>
              <li>Review and modify test details as required</li>
              <li>Click &apos;Start Speed Test&apos;</li>
              <li>
                Once results are received, the remaining ETH (or other native
                token) will be refunded to your wallet
              </li>
            </ol>
          </div>

          <div className="flex-1 bg-white p-6 rounded-2xl">
            <legend className="text-base text-xl font-semibold leading-6 text-gray-900 pb-4">
              FAQ
            </legend>
            <ul className="list-none">
              <li>
                <b>
                  How does the RPC Speed Test measure transaction propagation
                  speed?
                </b>
              </li>
              <p>
                It sends multiple identical transactions to all selected RPCs at
                once, then compares block number and transaction order to
                determine the fastest RPC. The more loops you test, the more
                accurate the results will be.
              </p>
              <li>
                <b>
                  Does the app store any user information (wallets, IPs, etc.)?
                </b>
              </li>
              <p>
                No, the app only keeps a local state in the browser and no user
                info is shared or stored online.
              </p>
              <li>
                <b>Is the code open source?</b>
              </li>
              <p>
                Yes, you can review the code and methodology{" "}
                <a
                  className="text-brand-green underline hover:no-underline"
                  href="https://github.com/eden-network/rpc-speedtest"
                >
                  on GitHub
                </a>
                .
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speedtest;
