import React, { useState } from "react";
import { mainnet, useNetwork } from "wagmi";
import ResultsTable from "./ResultsTable";
import RPCs from "./RPCs";
import Details from "./Details";
import { RPC_URLS } from "../core/rpcs";
import useSpeedTest from "../hooks/useSpeedTest";
import Spinner from "./Spinner";
import { formatNumber } from "../utils/formatNumber";
import { formatEther } from "ethers/lib/utils.js";

function getCurrentIteration(
  loopCount: number,
  itemsToLoop: number,
  results: number
): number {
  const itemsPerIteration = Math.ceil(itemsToLoop / loopCount);
  const currentIteration = Math.floor(results / itemsPerIteration) + 1;

  return Math.min(currentIteration, loopCount);
}

const Speedtest: React.FC = () => {
  const [loops, setLoops] = useState(() => 4);
  const [delay, setDelay] = useState(() => 13);
  const { chain: activeChain } = useNetwork();
  const chain = activeChain || mainnet;
  const [rpcUrls, setRpcUrls] = useState(() => RPC_URLS[chain.id as 1 | 80001]);

  const {
    initialWallet,
    results,
    wallets,
    status,
    totalAmount,
    transferPrice,
    sendTransaction,
  } = useSpeedTest({
    chain,
    delay,
    loops,
    rpcUrls,
  });

  return (
    <div className="Speedtest mt-8 flex-1 flex flex-col">
      <div className="container mx-auto max-w-7xl grid grid-cols-2 gap-12 px-6">
        <section className="mb-8">
          <RPCs chain={chain} urls={rpcUrls} setUrls={setRpcUrls} />
        </section>
        <section className="mb-8">
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
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white flex-1 flex flex-col px-6 py-10">
        <div className="container mx-auto max-w-7xl flex-1 flex">
          {status === "idle" && (
            <div className="w-full flex-col flex items-center justify-center">
              <button
                className="rounded-full bg-white px-4 py-2.5 text-2xl font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-75"
                type="button"
                onClick={() => sendTransaction?.()}
                disabled={!initialWallet || !rpcUrls.length}
              >
                {"Start Speed Test"}
              </button>
              <h1 className="mt-6 text-indigo-300 max-w-prose text-center">
                {`Beginning the test will transfer ${formatNumber(
                  Number(formatEther(totalAmount)),
                  { maximumSignificantDigits: 2 }
                )} ${
                  chain.nativeCurrency.symbol
                } to the Genesis Wallet, create ${
                  rpcUrls.length
                } SpeedTest wallets, and send ${loops} transactions from each.`}
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
          {(status === "running" || results.length > 0) && (
            <div className="mb-6 flex-1">
              <ResultsTable chain={chain} results={results} />
              <p className="mt-6 w-full flex items-center justify-center text-xl">
                {status === "running" && (
                  <>
                    <span className="mr-4">
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
                {status === "success" && <span>{"Speedtest complete!"}</span>}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Speedtest;
