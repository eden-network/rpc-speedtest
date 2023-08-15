import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import { Chain } from "wagmi";
import { ellipsis } from "../utils/ellipsis";

const CleanupTable = ({
  txData,
  chain,
}: {
  chain: Chain;
  txData: {
    wallet: string;
    balance: BigNumber;
    value: BigNumber;
    txHash?: string;
  }[];
}) => {
  if (!txData.length) {
    return null;
  }
  return (
    <div>
      <h2 className="font-bold text-lg mb-2 container max-w-7xl mx-auto px-4 md:px-6">
        {"Wallet Cleanup"}
      </h2>
      <div className="overflow-x-scroll container mx-auto max-w-[4000px] px-4 md:px-6 hide-scroll">
        <table className="min-w-full divide-y divide-gray-300 bg-white text-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                {"Wallet"}
              </th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                {"Balance"}
              </th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                {"Amount to return"}
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900"
              >
                {"Transaction"}
              </th>
            </tr>
          </thead>
          <tbody>
            {txData.map((x, i) => (
              <tr key={i}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  <a
                    href={`${chain.blockExplorers?.default.url}/address/${x.wallet}`}
                    className="underline hover:no-underline"
                  >
                    {x.wallet}
                  </a>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right overflow-hidden">
                  {formatEther(x.balance)} {chain.nativeCurrency.symbol}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right overflow-hidden">
                  {x.txHash ? formatEther(x.value) : "0"}{" "}
                  {chain.nativeCurrency.symbol}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-right overflow-hidden">
                  {x.txHash ? (
                    <a
                      href={`${chain.blockExplorers?.default.url}/tx/${x.txHash}`}
                      className="underline hover:no-underline"
                    >
                      {ellipsis(x.txHash, 6)}
                    </a>
                  ) : (
                    "Insufficient funds"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CleanupTable;
