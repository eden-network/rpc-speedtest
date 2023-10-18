import { BigNumber, Wallet, ethers } from "ethers";
import { useState } from "react";
import { Chain } from "wagmi";

export const useCleanup = ({
  initialProvider,
  chain,
}: {
  initialProvider: ethers.providers.JsonRpcProvider;
  chain: Chain;
}) => {
  const [cleanupTxs, setCleanupTxs] = useState<any[]>([]);

  const resetCleanup = () => setCleanupTxs([]);

  const cleanup = async ({
    wallets,
    returnWallet,
    estimateGas
  }: {
    wallets: Wallet[];
    returnWallet: `0x${string}`;
    estimateGas: BigNumber
  }) => {
    const allTransactions = [];
    console.log("Cleaning up wallets");
    for (let i = 0; i < wallets.length; i++) {
      console.log(`Wallet ${i + 1} of ${wallets.length}`);
      const wallet = wallets[i];
      const balance = await initialProvider.getBalance(wallet.address);
      const gasPrice = await wallet.connect(initialProvider).getGasPrice();
      const value = balance.sub(gasPrice.mul(estimateGas));

      if (balance.gt(0) && value.gt(0)) {
        console.log(
          `Sweeping ${ethers.utils.formatEther(balance)} ${chain.nativeCurrency.symbol
          } from ${wallet.address}`
        );

        try {
          const tx = {
            to: returnWallet,
            from: wallet.address,
            value,
            gasLimit: estimateGas,
            gasPrice: gasPrice,
          };
          const txRequest = await wallet
            .connect(initialProvider)
            .populateTransaction(tx);
          const signedTx = await wallet.signTransaction(txRequest);
          const txHash = await initialProvider.send("eth_sendRawTransaction", [
            signedTx,
          ]);

          console.log(`Swept to ${returnWallet} in tx ${txHash}`);
          setCleanupTxs((arr) => [
            ...arr,
            {
              wallet: wallet.address,
              balance,
              value,
              txHash,
            },
          ]);
          allTransactions.push(txHash);
        } catch (e) {
          console.error(e)
        }
      } else {
        console.log(`Insufficient ${chain.nativeCurrency.symbol} to sweep`);
        setCleanupTxs((arr) => [
          ...arr,
          {
            wallet: wallet.address,
            balance,
            value,
          },
        ]);
      }
    }

    // Wait for all sweep transactions to complete
    await Promise.all(
      allTransactions.map(async (txHash) => {
        await initialProvider.waitForTransaction(txHash);
      })
    );

    console.log("Cleanup done");

    return wallets;
  };

  return { cleanup, cleanupTxs, resetCleanup };
};
