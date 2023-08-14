import { useRef } from "react";
import { useOnClickOutside, useReadLocalStorage } from "usehooks-ts";
import { LocalSpeedtestWallets } from "../types";
import { useBalance, useNetwork } from "wagmi";

const TestWallet = ({
  address,
  privKey,
  symbol,
}: {
  address: `0x${string}`;
  privKey: string;
  symbol: string;
}) => {
  const { data: balance } = useBalance({ address });
  return (
    <div className="items-start" key={address}>
      <dt className="min-w-0 text-xs font-medium text-gray-500 whitespace-nowrap">
        {balance?.formatted}
        {` ${symbol}`}
      </dt>
      <dd className="flex-1 min-w-0 leading-none">
        <span className="break-words text-xs">{address}</span>
        <br />
        <span className="text-xs py-1 opacity-75 break-words">
          🔐 {privKey}
        </span>
      </dd>
    </div>
  );
};

const TestWallets = ({ close }: { close: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { chain } = useNetwork();
  useOnClickOutside(ref, close);
  const localWallets =
    useReadLocalStorage<LocalSpeedtestWallets>("speedtest.wallets");

  const filteredWallets = Object.entries(localWallets || {}).filter(
    ([, x]) => x.chain === chain?.id
  );

  return (
    <div className="fixed h-screen w-screen bg-brand-blue bg-opacity-30 z-50 flex justify-center items-center inset-0">
      <div
        className="container max-w-xl mx-auto p-4 rounded-lg bg-white"
        ref={ref}
      >
        <h2 className="font-bold mb-4">
          {"Your SpeedTest wallets on "}
          {chain?.name}
        </h2>
        <dl className="space-y-4 max-h-96 overflow-y-scroll hide-scroll">
          {filteredWallets.map(([address, { privKey }], i) => (
            <TestWallet
              address={address as `0x${string}`}
              privKey={privKey}
              symbol={chain?.nativeCurrency.symbol || "ETH"}
              key={i}
            />
          ))}
        </dl>
      </div>
    </div>
  );
};

export default TestWallets;
