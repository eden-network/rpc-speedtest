import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PlusIcon } from "../stories/icons/PlusIcon";
const RPCs = ({
  rpcCount,
  urls,
  setUrls,
}: {
  rpcCount: number,
  urls: string[];
  setUrls: Dispatch<SetStateAction<string[]>>;
}) => {
  const [rpcUrls, setRpcUrls] = useState(() =>
    urls.map((x) => ({
      url: x,
      editable: false,
    }))
  );

  const [selectedUrls, setSelectedUrls] = useState(() =>
    rpcUrls.map((x) => x.url)
  );

  useEffect(() => {
    setUrls(selectedUrls);
  }, [selectedUrls]);

  const handleRpcChange = (url: string) => {
    setSelectedUrls((urls) => {
      if (urls.includes(url)) {
        const newUrls = urls.slice(0);
        const idx = urls.indexOf(url);
        newUrls.splice(idx, 1);
        return newUrls;
      }
      return [...urls, url.trim()];
    });
  };

  return (
    <div className="bg-white text-brand-blue rounded-md p-6 drop-shadow-xl min-h-[55vh]">
      <fieldset>
        <div className="flex font-bold">
          <legend className="flex-1 text-lg font-bold leading-6 pl-2">
            {"Selected RPCs"}
          </legend>
          {rpcCount === 0 ? (
            <dd className="ml-3 min-h-[1.25rem] text-right text-red-600 leading-none">
              {rpcCount}
              <br />
              <span className="text-xs text-red-600 opacity-75">
                {"Select at least one RPC"}
              </span>
            </dd>
          ) : (
            <dd className="mr-2 text-sm h-6"><span>{"Selected: "}</span>{rpcCount}</dd>
          )}
        </div>
        <div className="mt-4">
          {rpcUrls.map((rpc, i) => (
            <label
              htmlFor={`rpc-${rpc.url}`}
              key={i}
              className={`relative flex items-center p-2 cursor-pointer hover:bg-indigo-50/50 ${!selectedUrls.includes(rpc.url) ? "opacity-75" : ""
                }`}
            >
              <div className="min-w-0 flex-1 text-sm leading-6">
                <span className="font-medium text-brand-blue">
                  {rpc.editable ? (
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-brand-blue shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="e.g. https://some-rpc.com/"
                      onChange={(e) =>
                        setRpcUrls((rpcs) => {
                          return rpcs.map((rpc, j) => {
                            if (i === j) {
                              return {
                                ...rpc,
                                url: e.target.value.trim(),
                              };
                            }

                            return rpc;
                          });
                        })
                      }
                    />
                  ) : (
                    rpc.url
                  )}
                </span>
              </div>
              <div className="ml-3 flex h-6 items-center">
                <input
                  id={`rpc-${rpc.url}`}
                  name={`rpc-${rpc.url}`}
                  type="checkbox"
                  checked={selectedUrls.includes(rpc.url)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 accent-indigo-600"
                  onChange={() => handleRpcChange(rpc.url)}
                />
              </div>
            </label>
          ))}
        </div>
        <div className="flex">
          <div className="text-right p-2">
            <button
              onClick={() =>
                setRpcUrls((x) => [...x, { editable: true, url: "" }])
              }
              className="flex gap-2 items-center rounded-md border-indigo-600 border-2 px-2 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {"Add a custom RPC"}
              <PlusIcon css="border-2 rounded-full border-brand-blue" size="w-4 h-4" />
            </button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default RPCs;
