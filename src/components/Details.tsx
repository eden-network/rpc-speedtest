import { BigNumber, Wallet } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import { Dispatch, SetStateAction, useState } from "react";
import { Chain } from "wagmi";

const Details = ({
  rpcCount,
  loops,
  setLoops,
  delay,
  setDelay,
  totalCost,
  transferCost,
  chain,
  initialWallet,
  wallets,
}: {
  chain: Chain;
  rpcCount: number;
  loops: number;
  setLoops: Dispatch<SetStateAction<number>>;
  delay: number;
  setDelay: Dispatch<SetStateAction<number>>;
  totalCost: BigNumber;
  transferCost: BigNumber;
  initialWallet: Wallet;
  wallets?: Wallet[];
}) => {
  const [showWallets, setShowWallets] = useState(true);

  return (
    <aside>
      <legend className="text-lg font-semibold leading-6 text-white pt-6">
        {"Speed Test Configuration"}
      </legend>
      <dl className="mt-4">
        <div className={`flex items-center py-2 justify-between`}>
          <div>
            <p className="min-w-0 flex-1 text-sm leading-6 font-medium text-white">
              {"Loops"}
            </p>
            <p className="text-brand-gray text-xs">
              {"Number of transactions sent to each RPC."}
            </p>
          </div>
          <dd className="ml-3 h-6 flex items-center">
            <button
              className="bg-gradient-fresh text-brand-kblue rounded-md rounded-md border-indigo-600 text-xl rounded-full flex items-center justify-center h-5 w-5 mr-1 p-3"
              onClick={() => setLoops((x) => Math.max(1, x - 1))}
            >
              {"-"}
            </button>
            <span className="text-white w-10 text-center">{loops}</span>
            <button
              className="bg-gradient-fresh text-brand-blue rounded-md border-indigo-600 text-xl text-indigo-600 flex items-center justify-center h-5 w-5 ml-1 p-3"
              onClick={() => setLoops((x) => x + 1)}
            >
              {"+"}
            </button>
          </dd>
        </div>
        <div className={`flex items-center py-2 justify-between`}>
          <div>
            <p className="min-w-0 flex-1 text-sm leading-6 font-medium text-white">
              {"Delay"}
            </p>
            <p className="text-brand-gray text-xs">
              {"How many seconds to wait between each loop"}
            </p>
          </div>
          <dd className="ml-3 h-6 flex items-center">
            <button
              className="bg-gradient-fresh text-brand-blue rounded-md border-indigo-600 text-xl rounded-full text-indigo-600 flex items-center justify-center h-5 w-5 mr-1 p-3"
              onClick={() => setDelay((x) => Math.max(0, x - 1))}
            >
              {"-"}
            </button>
            <span className="text-white w-10 text-center">
              {delay}
              {/* <span className="text-xs">{"s"}</span> */}
            </span>
            <button
              className="bg-gradient-fresh text-brand-blue rounded-md border-indigo-600 text-sm rounded-full text-indigo-600 flex items-center justify-center h-5 w-5 ml-1 p-3"
              onClick={() => setDelay((x) => x + 1)}
            >
              {"+"}
            </button>
          </dd>
        </div>
        <div className={`flex items-center py-2 justify-between`}>
          <div>
            <p className="min-w-0 flex-1 text-sm leading-6 font-medium text-white">
              {"Transactions"}
            </p>
            <p className="text-brand-gray text-xs">
              {"Counting all RPC loops and test wallets created."}
            </p>
          </div>
          <dd className="ml-3 h-6 text-white">{rpcCount * loops + rpcCount + 1}</dd>
        </div>
        <div className={`flex items-center py-2 text-gray-800 justify-between`}>
          <div>
            <p className="min-w-0 flex-1 text-sm leading-6 font-medium text-white">
              {"Cost"}
            </p>
            <p className="text-brand-gray text-xs">
              {"Includes 25% buffer. Any surplus is returned to your wallet."}
            </p>
          </div>
          <dd className="ml-3 min-h-[1.25rem] text-right leading-none text-white">
            {formatEther(totalCost || "0")} {chain.nativeCurrency.symbol}
            <br />
            <span className="text-xs">
              {"("}
              {formatEther(transferCost)} {chain?.nativeCurrency.symbol}
              {" per tx)"}
            </span>
          </dd>
        </div>
        <div className={`py-2`}>
          <dt className="text-white min-w-0 flex-1 text-sm leading-6 font-medium flex justify-between">
            {"Wallets"}
            <button
              onClick={() => setShowWallets((x) => !x)}
              className="text-white underline text-xs"
            >
              {`${showWallets ? "Hide" : "Show"} Wallets`}
            </button>
          </dt>
          {showWallets && (
            <dd className="text-xs">
              <dl className="space-y-2">
                <div className="flex items-start">
                  <dt className="min-w-0 text-xs leading-6 font-medium text-brand-gray whitespace-nowrap">
                    {"Genesis"}
                  </dt>
                  <dd className="flex-1 ml-3 text-brand-gray text-right min-w-0 leading-none">
                    <span className="break-words text-xs">
                      {initialWallet.address}
                    </span>
                    <br />
                    <span className="text-xs text-right py-1 break-words">
                      {initialWallet.privateKey} 🔐
                    </span>
                  </dd>
                </div>
                {wallets?.map((w, i) => (
                  <div className="flex items-start" key={w.address}>
                    <dt className="min-w-0 text-xs leading-6 font-medium text-gray-500 whitespace-nowrap">
                      {`SpeedTest ${i + 1}`}
                    </dt>
                    <dd className="flex-1 ml-3 text-right min-w-0 leading-none">
                      <span className="break-words text-xs">{w.address}</span>
                      <br />
                      <span className="text-xs text-right py-1 opacity-75 break-words">
                        {w.privateKey} 🔐
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </dd>
          )}
        </div>
      </dl>
    </aside>
  );
};

export default Details;
