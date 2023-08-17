// src/hooks/useNewWallets.ts
import { BigNumber, Wallet } from "ethers";
import { useCallback, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Chain } from "wagmi";

const createNewWallet = async ({
  wallet,
  amount,
  gasPrice,
  maxPriorityFeePerGas,
  i,
}: {
  wallet: Wallet;
  amount: BigNumber;
  gasPrice: BigNumber;
  maxPriorityFeePerGas: BigNumber;
  i: number;
}): Promise<Wallet> => {
  const randomWallet = Wallet.createRandom();

  const tx = {
    to: randomWallet.address,
    value: amount,
    gasLimit: "21000",
    maxPriorityFeePerGas,
    maxFeePerGas: gasPrice,
  };

  const txResponse = await wallet.sendTransaction(tx);
  console.log(
    `Seeding wallet ${i + 1}:`,
    randomWallet.address,
    `in tx ${txResponse.hash}`
  );
  await txResponse.wait();

  return randomWallet;
};

export const useNewWallets = ({
  rpcUrls,
  amount,
  gasPrice,
  maxPriorityFeePerGas,
  initialWallet,
  chain,
}: {
  rpcUrls: string[];
  amount: BigNumber;
  gasPrice: BigNumber;
  maxPriorityFeePerGas: BigNumber;
  initialWallet: Wallet;
  chain: Chain;
}) => {
  const [localWallets, setLocalWallets] = useLocalStorage(
    "speedtest.wallets",
    {}
  );
  const [wallets, setWallets] = useState<Wallet[]>([]);

  const createWallets = useCallback(async () => {
    console.log(`Creating ${rpcUrls.length} wallets`);
    const newWallets: Wallet[] = [];

    for (let i = 0; i < rpcUrls.length; i++) {
      const wallet = await createNewWallet({
        wallet: initialWallet,
        amount,
        gasPrice,
        maxPriorityFeePerGas,
        i,
      });
      console.log(`Funded wallet ${i + 1}:`, wallet.address, wallet.privateKey);
      setLocalWallets({
        ...localWallets,
        [wallet.address]: {
          privKey: wallet.privateKey,
          chain: chain.id,
        },
      });
      setWallets((prevWallets) => [...prevWallets, wallet]);
      newWallets.push(wallet);
    }

    console.log("Wallet creation completed");

    return newWallets;
  }, [
    amount,
    gasPrice,
    maxPriorityFeePerGas,
    initialWallet,
    rpcUrls,
    localWallets,
    setLocalWallets,
    chain,
  ]);

  return {
    wallets,
    setWallets,
    createWallets,
  };
};
