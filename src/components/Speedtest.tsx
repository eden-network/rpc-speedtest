import React, { useEffect, useState, useMemo } from "react";
import { mainnet, useNetwork, useAccount } from "wagmi";
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
import { StartButton } from "../stories/buttons/StartButton";
import { Instructions } from "../stories/Instructions";
import { Faq } from "../stories/Faq";
import { Tasks } from "../stories/Tasks";
import { formatRpcRankings } from "../utils/formatRpcRankings";
import { Result } from "../types";
import { ScoreBoard } from "../stories/ScoreBoard";

function getCurrentIteration(
  loopCount: number,
  itemsToLoop: number,
  results: number,
): number {

  // || results === itemsToLoop
  if (results === 0) return 0;
  if (results === itemsToLoop) return loopCount + 1;
  const itemsPerIteration = Math.ceil(itemsToLoop / loopCount);
  const currentIteration = Math.floor(results / itemsPerIteration);
  if (currentIteration === 0) return 1;

  return Math.min(currentIteration + 1, loopCount);
}

const Speedtest: React.FC = () => {
  const [loops, setLoops] = useState(() => 4);
  const [delay, setDelay] = useState(() => 1);
  const { chain: activeChain } = useNetwork();
  const chain = activeChain || mainnet;
  const [rpcUrls, setRpcUrls] = useState(getRpcUrls(chain.id));
  const [rpcKey, setRpcKey] = useState(chain.id);
  const { isConnected } = useAccount()

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

  // useEffect(() => {
  //   // any time new result comes in
  //   if (!!results.length) {
  //     scrollToBottom();
  //   }
  // }, [results]);

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


  let iteration: number = 0



  const tasksProgress: { loop: number; order: number }[] = []
  for (var i = 0; i < loops; i++) {
    tasksProgress.push({
      loop: i + 1,
      order: 0
    })
  }
  results.map((result, i) => {
    iteration = result.iteration
    tasksProgress.map((percentage, i) => {
      if (result.iteration === percentage.loop) {
        result.order ? percentage.order++ : 0
      }
    })
  })



  // getCurrentIteration(
  // loops,
  // rpcUrls.length * loops,
  //results.length
  //) > i + 1 && (status === "running" || status === "cleaning" || status === "success") ? 100 : 0
  //getCurrentIteration(
  //loops,
  //rpcUrls.length * loops,
  //results.length
  //) === i + 1 && (status === "running")
  //})
  const loopsArr = []
  for (var i = 0; i < loops; i++) {
    loopsArr.push({
      name: `Loop ${i + 1}`,
      percentage: tasksProgress[i].order / rpcUrls.length * 100,
      isActive: iteration === i + 1
    })
  }

  const rpcUrlsArr = []
  for (var i = 0; i < rpcUrls.length; i++) {
    rpcUrlsArr.push({
      label: rpcUrls[i],
      first: 0,
      second: 0,
      third: 0
    })
  }

  const tasks = [{
    name: "Transfer to the Genesis Wallet",
    percentage: status == "idle" ? 0 : 100,
    isActive: status === "starting"
  },
  {
    name: status !== "seeding" ?
      "Funding SpeedTest Wallets" : `Funding SpeedTest wallet ${Math.min(
        wallets.length + 1,
        rpcUrls.length
      )} of ${rpcUrls.length}`,
    percentage: wallets.length / rpcUrls.length * 100,
    isActive: status == "seeding" || status == "idle" || status == "starting"
  },
  ...loopsArr,
  {
    name: "Running wallet clean-up",
    percentage: status === "success" ? 100 : 0,
    isActive: status === "cleaning"
  }
  ]

  const rpcData = useMemo(() => formatRpcRankings(results), [results]);
  // console.log(rpcData);
  // console.log(results)
  // console.log(getCurrentIteration(
  //   loops,
  //   rpcUrls.length * loops,
  //   results.length
  // ))
  // console.log(rpcUrls)


  return (

    <div className="Speedtest bg-brand-blue flex-1 flex flex-col">
      {status}
      {status === "idle" &&
        <div className="border-b-[70px] border-brand-lime">
          <h1 className="mx-auto text-white text-center text-4xl font-bold p-6">Accurately Measure
            <span className="bg-gradient-fresh bg-clip-text text-transparent"> Transaction Propagation Speeds</span><br></br>
            from Your Browser</h1>
          <div className="relative top-8 z-10 container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 px-4 md:px-6">
            <section className="">
              <RPCs
                rpcCount={rpcUrls.length}
                key={rpcKey}
                urls={rpcUrls}
                setUrls={setRpcUrls}
              />
            </section>
            <section className="flex-col justify-between">
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
              <StartButton
                amount={totalAmount}
                currency={chain.nativeCurrency.symbol}
                wallets={rpcUrls.length}
                loops={loops}
                isConnected={isConnected}
                initialWallet={initialWallet}
                rpcUrls={rpcUrls.length}
                onClick={startTest}
              />
            </section>
          </div>
        </div>
      }
      {(status === "seeding" || status === "starting" || status === "running" || status === "cleaning") && (
        <div className="">
          <h1 className="mx-auto text-white text-center text-4xl font-bold pt-6 pb-2 w-7/12">Test in progress</h1>
          <p className="text-center bg-gradient-fresh bg-clip-text text-transparent text-xl mb-10">Do not refresh your browser or close the page while the test is in progress</p>
          <div className="flex mx-auto max-w-7xl justify-between px-6 gap-10">
            <ScoreBoard rpcData={results.length === 0 ? rpcUrlsArr : rpcData} />
            <Tasks tasks={tasks} />
          </div>
        </div>
      )}
      {(status === "success") && (
        <div className="">
          <h1 className="mx-auto text-white text-center text-4xl font-bold pt-6 pb-2 w-7/12">Test completed</h1>
          <p className="text-center bg-gradient-fresh bg-clip-text text-transparent text-xl mb-10"></p>
          <div className="flex mx-auto max-w-7xl justify-between px-6 gap-10">
            <ScoreBoard rpcData={results.length === 0 ? rpcUrlsArr : rpcData} />
            <div className="text-white text-center text-2xl flex space-between">
              <h1>Winner<br></br><span>has been determined</span></h1>
              <button
                className="border-brand-lime rounded-md text-sm"
                onClick={() => {
                  reset();
                }}
              >
                {"Setup a new test"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="text-brand-blue flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {/* {(status === "seeding" || status === "starting") && (
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
          )} */}
          {(status === "running" ||
            status === "success" ||
            status === "cleaning") && (
              <div className="flex-1 space-y-6 max-w-full bg-white">
                <ResultsTable chain={chain} results={results} />
                {/* <RankingsTable chain={chain} results={results} />
                <CleanupTable chain={chain} txData={cleanupTxs} />
                <ScoreBoard rpcData={rpcData} /> */}
                {/* <p className="w-full flex items-center justify-center text-xl">
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
                </p> */}
              </div>
            )}
        </div>
      </div>
      <div id="scrollAnchor" />
      <div className="bg-white bg-[url('../public/eden-background-white.svg')] bg-center bg-cover">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 px-4 md:px-6 py-4 md:py-8">
          <Instructions />
          <Faq isConnected={isConnected} />
        </div>
      </div>
    </div>
  );
};

export default Speedtest;
