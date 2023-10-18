import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import { Dispatch, SetStateAction, useState } from "react";
import { Chain } from "wagmi";
import { CounterButton } from "./CounterButton";
import { ToolTip } from "./ToolTip";
const Details = ({
  rpcCount,
  loops,
  setLoops,
  totalCost,
  transferCost,
  chain,
}: {
  chain: Chain;
  rpcCount: number;
  loops: number;
  setLoops: Dispatch<SetStateAction<number>>;
  totalCost: BigNumber;
  transferCost: BigNumber;
}) => {

  return (
    <aside className="pt-6">
      <legend className="text-2xl font-bold leading-6 text-white">
        {"Speed Test Configuration"}
      </legend>
      <dl className="mt-4">
        <div className={`flex items-center py-1 justify-between`}>
          <div className="w-80">
            <p className="min-w-0 flex-1 text-xl font-medium text-white">
              {"Loops"}
            </p>
            <p className="text-brand-gray text-xs">
              {"Number of transactions sent to each RPC. Increasing the number of loops improves accuracy on the test."}
            </p>
          </div>
          <dd className="ml-3 flex items-center">
            <CounterButton add={false} onClick={() => setLoops((x) => x > 1 ? x - 1 : x)} />
            <ToolTip loops={loops}>
              <span data-tooltip-target="tooltip-light" data-tooltip-style="light" className="text-white text-xl w-10 text-center select-none font-semibold">{loops}</span>
            </ToolTip>
            <CounterButton add={true} onClick={() => setLoops((x) => x + 1)} />
          </dd>
        </div>
        <div className={`flex items-center py-1 justify-between`}>
          <div>
            <p className="min-w-0 flex-1 text-xl font-medium text-white">
              {"Transactions"}
            </p>
            <p className="text-brand-gray text-xs">
              {"Counting all RPC loops and test wallets created."}
            </p>
          </div>
          <dd className="ml-3 h-6 text-white text-xl font-semibold">{rpcCount * loops + rpcCount + 1}</dd>
        </div>
        <div className={`flex items-center py-1 text-gray-800 justify-between`}>
          <div>
            <p className="min-w-0 flex-1 text-xl font-medium text-white">
              {"Cost per transaction"}
            </p>
            <p className="text-brand-gray text-xs max-w-xs">
              {"Estimated Cost per transaction, cost varies based on network conditions."}
            </p>
          </div>
          <dd className="ml-3 min-h-[1.25rem] text-right leading-none text-white">
            <span className="text-xl font-semibold">
              {formatEther(transferCost)} {chain?.nativeCurrency.symbol}
            </span>
          </dd>
        </div>
        <div className={`flex items-center py-1 text-gray-800 justify-between`}>
          <div>
            <p className="min-w-0 flex-1 text-xl font-medium text-white">
              {"Maximum Cost"}
            </p>
            <p className="text-brand-gray text-xs max-w-xs	">
              {"Includes 25% buffer. Any surplus is returned to your wallet."}
            </p>
          </div>
          <dd className="text-xl ml-3 min-h-[1.25rem] text-right leading-none text-white font-semibold">
            {formatEther(totalCost || "0")} {chain.nativeCurrency.symbol}
          </dd>
        </div>
      </dl>
    </aside>
  );
};

export default Details;
