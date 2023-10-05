import { Chain } from "wagmi";
import { ellipsis } from "../utils/ellipsis";
import { Result } from "../types";

const resultSortFn = (a: Result, b: Result) => {
  if (a.iteration !== b.iteration) {
    return a.iteration - b.iteration;
  }

  if (a.blockNumber && b.blockNumber && a.order && b.order) {
    if (a.blockNumber !== b.blockNumber) {
      return a.blockNumber - b.blockNumber;
    }

    return a.order - b.order;
  }

  return 0;
};

const ResultsTable = ({
  results,
  chain,
}: {
  results?: Result[];
  chain: Chain;
}) => {
  if (!results?.length) {
    return null;
  }

  const sortedResults = [...(results || [])].sort(resultSortFn);

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-center text-3xl font-bold mb-2">Speed Test Detailed Results</h1>
      <h1 className="text-center text-l font-bold mb-6">Review of individual transactions from the speed test</h1>
      <div className="overflow-x-scroll container mx-auto max-w-[4000px] hide-scroll px-4 md:px-6">
        <table className="min-w-full divide-y divide-gray-300 bg-white text-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
              >
                {"Loop"}
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900"
              >
                {"RPC"}
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                {"Transaction"}
              </th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                {"Block"}
              </th>
              <th className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">
                {"Order"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedResults?.map((result, i) => {
              return (
                <tr
                  key={i}
                  className={
                    result.iteration % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    {result.iteration}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium text-gray-900 text-left">
                    {result.label}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-left overflow-hidden">
                    <a
                      title={result.tx}
                      className="underline hover:no-underline"
                      href={`${chain?.blockExplorers?.default.url}/tx/${result.tx}`}
                      target="_blank"
                      rel="noreferrer nofollow"
                    >
                      {ellipsis(result.tx, 8)}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                    {result.blockNumber ? (
                      <a
                        className="underline hover:no-underline"
                        href={`${chain?.blockExplorers?.default.url}/block/${result.tx}`}
                        target="_blank"
                        rel="noreferrer nofollow"
                      >
                        {result.blockNumber}
                      </a>
                    ) : (
                      "Pending"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right">
                    {result.order}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
