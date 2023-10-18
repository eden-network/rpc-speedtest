import { BigNumber, Wallet, ethers } from "ethers";
import { formatEther, parseUnits } from "ethers/lib/utils.js";
import { useCallback, useState } from "react";
import { Result } from "../types";

const ticksToDate = (ticks: number) => {
  const epochTicks = BigInt("621355968000000000");
  const unixMilliseconds = BigInt((BigInt(ticks) - epochTicks) / BigInt(10000));
  const date = new Date(Number(unixMilliseconds));

  return date;
};

export const useSelfTransactions = ({
  initialProvider,
  initialWallet,
  rpcUrls,
  loops,
  delay = 13,
}: {
  initialProvider: ethers.providers.JsonRpcProvider;
  initialWallet: Wallet;
  rpcUrls: string[];
  loops: number;
  delay: number;
}) => {
  const [results, setResults] = useState<Result[]>([]);

  const sendSelfTransactions = useCallback(
    async ({
      wallet,
      gasPrice,
      maxFee,
      provider,
      onResult,
      i,
      label,
      estimateGas
    }: {
      wallet: Wallet;
      gasPrice?: BigNumber;
      maxFee: BigNumber;
      provider: ethers.providers.JsonRpcProvider;
      onResult: (args: Result) => void;
      i: number;
      label: string;
      estimateGas?: BigNumber
    }) => {
      try {
        console.log(`Building transaction ${i + 1} from ${wallet.address}`);

        const typeTwoTx = {
          to: wallet.address,
          from: wallet.address,
          value: 0,
          gasLimit: estimateGas,
          maxPriorityFeePerGas: maxFee,
          maxFeePerGas: gasPrice,
        };

        // show rpc iteration beginning
        onResult({
          iteration: i + 1,
          wallet: wallet.address,
          label,
          tx: "",
        });

        //////// try / catch the variable for transaction type to avoid code duplication
        const txRequest = await wallet
          .connect(initialProvider)
          .populateTransaction(typeTwoTx);
        const signedTx = await wallet.signTransaction(txRequest);
        const txHash = await provider.send("eth_sendRawTransaction", [
          signedTx,
        ]);
        console.log(
          `Transaction ${i + 1} from ${wallet.address}: ${txHash} (${label})`
        );

        // show pending tx
        onResult({
          iteration: i + 1,
          wallet: wallet.address,
          tx: txHash,
          label,
        });

        const txReceipt = await initialProvider.waitForTransaction(txHash);
        const block = await initialProvider.getBlockWithTransactions(
          txReceipt.blockNumber
        );
        const index = block.transactions.findIndex((x) => x.hash === txHash);

        // fetch block data
        const zeroMevReq = await fetch(
          `https://api.zeromev.org/zmblock/${txReceipt.blockNumber}`
        ).catch((e) => e);
        const zeroMevJson = (await zeroMevReq.json()) as {
          pop: [{ name: string; times: { t: number }[] }];
        };
        // get the matching block
        const zeroMevData =
          zeroMevJson.pop?.filter(
            (x: { times: { t: number }[] }) =>
              x.times.length === block.transactions.length
          ) || [];

        // pull out the first seen dates for different regions
        const firstSeen = zeroMevData
          .map((x) => {
            const ticks = x.times[index]?.t;

            if (ticks) {
              return {
                name: x.name,
                date: ticksToDate(ticks),
              };
            }
          })
          .filter(Boolean) as Result["firstSeen"];

        const result = `Transaction ${i + 1} from ${wallet.address
          } was included in block ${txReceipt.blockNumber} with order ${index + 1
          } (${label})`;

        onResult({
          iteration: i + 1,
          wallet: wallet.address,
          tx: txHash,
          blockNumber: txReceipt.blockNumber,
          order: index + 1,
          label,
          firstSeen,
        });

        return result;
      } catch (e) {
        console.log(e);

        try {
          const typeZeroTx = {
            to: wallet.address,
            from: wallet.address,
            value: 0,
            gasLimit: estimateGas,
            gasPrice: gasPrice
          };

          const txRequest0 = await wallet
            .connect(initialProvider)
            .populateTransaction(typeZeroTx);
          const signedTx0 = await wallet.signTransaction(txRequest0);
          const txHash0 = await provider.send("eth_sendRawTransaction", [
            signedTx0,
          ]);
          console.log(
            `Transaction ${i + 1} from ${wallet.address}: ${txHash0} (${label})`
          );

          // show pending tx
          onResult({
            iteration: i + 1,
            wallet: wallet.address,
            tx: txHash0,
            label,
          });

          const txReceipt0 = await initialProvider.waitForTransaction(txHash0);
          const block0 = await initialProvider.getBlockWithTransactions(
            txReceipt0.blockNumber
          );
          const index0 = block0.transactions.findIndex((x) => x.hash === txHash0);

          // fetch block data
          const zeroMevReq0 = await fetch(
            `https://api.zeromev.org/zmblock/${txReceipt0.blockNumber}`
          ).catch((e) => e);
          const zeroMevJson0 = (await zeroMevReq0.json()) as {
            pop: [{ name: string; times: { t: number }[] }];
          };
          // get the matching block
          const zeroMevData0 =
            zeroMevJson0.pop?.filter(
              (x: { times: { t: number }[] }) =>
                x.times.length === block0.transactions.length
            ) || [];

          // pull out the first seen dates for different regions
          const firstSeen0 = zeroMevData0
            .map((x) => {
              const ticks = x.times[index0]?.t;

              if (ticks) {
                return {
                  name: x.name,
                  date: ticksToDate(ticks),
                };
              }
            })
            .filter(Boolean) as Result["firstSeen"];

          const result0 = `Transaction ${i + 1} from ${wallet.address
            } was included in block ${txReceipt0.blockNumber} with order ${index0 + 1
            } (${label})`;

          onResult({
            iteration: i + 1,
            wallet: wallet.address,
            tx: txHash0,
            blockNumber: txReceipt0.blockNumber,
            order: index0 + 1,
            label,
            firstSeen: firstSeen0,
          });

          return result0;
        } catch (e0) {
          console.error("Fallback transaction failed: ", e0);
        }
      }
    },
    [initialProvider]
  );

  const startSelfTransactions = useCallback(
    async (wallets: Wallet[], estimateGas: BigNumber) => {
      const onResult = (result: Result) => {
        setResults((prevResults) => {
          const existingResultIndex = prevResults.findIndex(
            (x) => x.label === result.label && x.iteration === result.iteration
          );

          if (existingResultIndex > -1) {
            return prevResults.map((x, i) => {
              if (i === existingResultIndex) {
                return {
                  ...x,
                  ...result,
                };
              }

              return x;
            });
          }

          return [...prevResults, result];
        });
      };

      console.log("Beginning transactions");

      for (let i = 0; i < loops; i++) {
        const promises = [];
        //import getFeeData only in one hook (useSpeedTest)
        const { lastBaseFeePerGas, maxPriorityFeePerGas } =
          await initialWallet.getFeeData();
        const maxFee = maxPriorityFeePerGas || parseUnits("1", "gwei");
        const gasPrice = lastBaseFeePerGas?.add(maxFee) || undefined;


        console.log("Iteration ", i + 1);
        console.log("Gas", {
          maxFeePerGas: gasPrice ? formatEther(gasPrice) : null,
          maxPriorityFeePerGas: formatEther(maxFee),
        });

        for (let j = 0; j < rpcUrls.length; j++) {
          const provider = new ethers.providers.JsonRpcProvider(rpcUrls[j]);
          promises.push(
            sendSelfTransactions({
              wallet: wallets[j].connect(initialProvider),
              gasPrice,
              maxFee,
              provider,
              onResult,
              i,
              label: rpcUrls[j],
              estimateGas
            })
          );
        }

        await Promise.all(promises);

        if (i < loops - 1) {
          // Wait for [delay] seconds before starting the next iteration, but not after the last one
          await new Promise((resolve) => setTimeout(resolve, delay * 1000));
        }
      }
    },
    [
      rpcUrls,
      loops,
      delay,
      sendSelfTransactions,
      initialProvider,
      initialWallet,
    ]
  );

  return {
    results,
    setResults,
    startSelfTransactions,
  };
};
