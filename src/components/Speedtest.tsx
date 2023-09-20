import React, { useEffect, useState } from "react";
import { mainnet, useNetwork } from "wagmi";
import ResultsTable from "./ResultsTable";
import RPCs from "./RPCs";
import Details from "./Details";
import { getRpcUrls } from "../core/rpcs";
import useSpeedTest from "../hooks/useSpeedTest";
import Spinner from "./Spinner";
import RankingsTable from "./RankingsTable";
import { scrollToBottom } from "../utils/scrollToBottom";
import { useLocalStorage } from "usehooks-ts";
import { LocalSpeedtestWallets } from "../types";
import CleanupTable from "./CleanupTable";
import ExternalLink from "./ExternalLink";
import { StartButton } from "../stories/StartButton";
import { useAccount } from 'wagmi'

function getCurrentIteration(
  loopCount: number,
  itemsToLoop: number,
  results: number,
): number {
  if (results === 0 || results === itemsToLoop) return 1;
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
  ç

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

  const startTest = () => {
    setLocalWallets({
      ...localWallets,
      [initialWallet.address]: {
        privKey: initialWallet.privateKey,
        chain: chain.id,
      }
    })
    sendTransaction?.();
  }


  console.log(typeof initialWallet)

  return (
    <div className="Speedtest bg-brand-blue flex-1 flex flex-col">
      <h1 className="mx-auto text-white text-center text-4xl font-bold p-6 w-1/2">Accurately Measure
        <span className="bg-gradient-fresh bg-clip-text text-transparent"> Transaction Propagation Speeds </span>
        from Your Browser</h1>
      <div className="z-10 container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 px-4 md:px-6 py-4 md:py-8">
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
          {status === "idle" && (
            <StartButton
              amount={totalAmount}
              currency={chain.nativeCurrency.symbol}
              wallets={rpcUrls.length}
              loops={loops}
              onClick={startTest}
              isConnected={isConnected}
              initialWallet={initialWallet}
              rpcUrls={rpcUrls.length}
            />
          )}
        </section>
      </div>
      <div className="flex h-20 bg-gradient-fresh">
      </div>
      <div className="text-brand-blue flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
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
      <div className="bg-white bg-[url('../public/eden-background-white.svg')] bg-center bg-cover">
        <div className=""></div>
        <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 px-4 md:px-6 py-4 md:py-8">
          <div className="flex-1 bg-white p-6 rounded-2xl drop-shadow-2xl">
            <legend className="text-base text-xl font-semibold leading-6 text-gray-900 pb-4">
              Instructions
            </legend>
            <ol className="list-decimal px-5 pt-4">
              <li className="pb-3">Connect your wallet</li>
              <li className="pb-3">
                Select a network that supports the RPC Speed Test (Ethereum,
                Arbitrum, Avalanche, Polygon Mumbai)
              </li>
              <li className="pb-3">
                Select the RPCs you want to test, and/or add your own by clicking
                &#34;Add a custom RPC&#34;
              </li>
              <li className="pb-3">Review and modify test details as required</li>
              <li className="pb-3">Click &#34;Start Speed Test&#34;</li>
              <li className="pb-3">
                Once results are received, the remaining ETH (or other native
                token) will be refunded to your wallet
              </li>
            </ol>
          </div>

          <div className="flex-1 bg-white p-6 rounded-2xl drop-shadow-2xl">
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
              <p className="pb-3">
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
              <p className="pb-3">
                No, the app only keeps a local state in the browser and no user
                info is shared or stored online.
              </p>
              <li>
                <b>Is the code open source?</b>
              </li>
              <p className="pb-3">
                Yes, you can review the code and methodology on {" "}
                <ExternalLink style="text-black underline hover:no-underline" url="https://github.com/eden-network/rpc-speedtest" content="Github"></ExternalLink>.
              </p>
              <li>
                <b>
                  What happens if the test is interrupted by closing or refreshing the browser window?
                </b>
              </li>
              <p>
                Reclaim the funds sent to the wallets here: show the SpeedTest wallet addresses
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speedtest;
