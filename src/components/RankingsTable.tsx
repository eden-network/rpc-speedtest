import { useMemo } from "react";
import { Result } from "../types";
import { getOrdinal } from "../utils/getOrdinal";
import { formatRpcRankings } from "../utils/formatRpcRankings";
import { addEthereumChain } from "../utils/addEthereumChain";
import { Chain } from "wagmi";

const RankingsTable = ({
  results,
  chain,
}: {
  results: Result[];
  chain: Chain;
}) => {
  const rpcData = useMemo(() => formatRpcRankings(results), [results]);
  const isMetaMask = window?.ethereum?.isMetaMask;

  if (!rpcData.length) {
    return null;
  }

  return (
    <div>
      <h2 className="font-bold text-lg mb-2 container max-w-7xl mx-auto px-4 md:px-6">
        {"RPC Rankings"}
      </h2>
      <div className="overflow-x-scroll container mx-auto max-w-[4000px] px-4 md:px-6 hide-scroll">
        <table className="min-w-full divide-y divide-gray-300 bg-white text-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                {"RPC"}
              </th>
              {rpcData.map((el, i) => {
                const position = i + 1;
                return (
                  <th
                    key={position}
                    className={`py-3.5 text-right text-sm font-semibold text-gray-900 ${
                      position === rpcData.length ? "pl-3 pr-4" : "px-3"
                    }`}
                  >
                    {getOrdinal(position)}
                  </th>
                );
              })}
              {isMetaMask && <th>{""}</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rpcData.map((rpc, i) => {
              const length = rpcData.length;
              return (
                <tr key={rpc.label}>
                  <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm font-medium text-gray-900">
                    {rpc.label} {i === 0 && <span>{"🥇"}</span>}
                    {i === 1 && <span>{"🥈"}</span>}
                    {i === 2 && <span>{"🥉"}</span>}
                  </td>
                  {Array.from({ length }).map((e, i) => {
                    // use the iterator to search for the number of this position in the array
                    // we +1 because the 'rankings' array value isn't 0 indexed
                    const count = rpc.rankings.filter(
                      (rank) => rank === i + 1
                    ).length;

                    return (
                      <td
                        key={`${i}-${rpc.label}`}
                        className={`whitespace-nowrap px-3 py-3 text-sm text-right overflow-hidden`}
                      >
                        {count}
                      </td>
                    );
                  })}
                  {isMetaMask && (
                    <td className="text-right pr-4 pl-3 py-3">
                      <button
                        type="button"
                        className="rounded-lg text-xs py-1 px-2 font-bold border-2 border-brand-green hover:bg-brand-green hover:bg-opacity-50"
                        onClick={() =>
                          addEthereumChain({ chain, rpcUrl: rpc.label })
                        }
                      >
                        {"Add to MetaMask"}
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingsTable;
