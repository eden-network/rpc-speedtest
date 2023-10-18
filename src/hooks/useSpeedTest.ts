import { BigNumber, Wallet, ethers } from "ethers";
// import { parseUnits } from "ethers/lib/utils.js";
import { useCleanup } from "./useCleanup";
import { useNewWallets } from "./useNewWallets";
import { useSelfTransactions } from "./useSelfTransactions";
import {
  Chain,
  useAccount,
  useBlockNumber,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { useEffect, useMemo, useState } from "react";
import useFeeData from "./useFeeData";
import { DEFAULT_RPC_URL } from "../core/rpcs";

const useSpeedTest = ({
  rpcUrls,
  loops,
  delay,
  chain,
}: {
  rpcUrls: string[];
  loops: number;
  delay: number;
  chain: Chain;
}) => {
  const [status, setStatus] = useState<
    | "idle"
    | "error"
    | "starting"
    | "seeding"
    | "running"
    | "cleaning"
    | "success"
  >("idle");
  const { data: blockNumber } = useBlockNumber({
    chainId: chain.id,
  });

  // user's account
  const user = useAccount();

  // used for sending initial txs
  const initialProvider = useMemo(() => {
    return new ethers.providers.JsonRpcProvider(
      DEFAULT_RPC_URL[chain.id as 1 | 80001]
    );
  }, [chain.id]);

  // throwaway speedtest wallet
  const initialWallet = useMemo(() => {
    const randomWallet = Wallet.createRandom();
    return new Wallet(randomWallet.privateKey, initialProvider);
  }, [initialProvider]);

  const { cleanup, cleanupTxs, resetCleanup } = useCleanup({
    initialProvider,
    chain,
  });

  const { gasPrice, estimateGas } = useFeeData({
    blockNumber,
    initialProvider
  });

  // return address
  const userWallet = user?.address;

  // current gas price * 21k transfer gas limit
  const transferPrice = gasPrice?.mul(estimateGas)

  // transfer price * the amount of times it needs to send (+ a 25% buffer)
  const amount =
    transferPrice?.mul(loops).mul(125).div(100) || BigNumber.from(0);

  // the seeding wallet needs the amount for all wallets to do their txs, plus the gas to actually seed the wallets
  const totalAmount = amount
    .mul(rpcUrls.length)
    .add(transferPrice.mul(rpcUrls.length + 1));

  const { wallets, createWallets, setWallets } = useNewWallets({
    rpcUrls,
    amount,
    initialWallet,
    chain,
  });

  const { results, startSelfTransactions, setResults } = useSelfTransactions({
    initialProvider,
    initialWallet,
    rpcUrls: rpcUrls.filter(Boolean),
    loops,
    delay,
  });

  // the prepared tx to send the eth to the speedtest wallet
  const { config } = usePrepareSendTransaction({
    request: {
      to: initialWallet?.address as string,
      value: totalAmount,
    },
    enabled: !!initialWallet?.address && !!gasPrice && !!amount,
  });

  // the send eth tx
  const { data, sendTransaction } = useSendTransaction(config);

  // the status of the send eth tx
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => {
      setStatus("seeding");
      const newWallets = await createWallets();
      setStatus("running");
      await startSelfTransactions(newWallets, estimateGas);
      if (userWallet) {
        setStatus("cleaning");
        await cleanup({ wallets: newWallets, returnWallet: userWallet, estimateGas: estimateGas });
      }
      setStatus("success");
    },
  });

  // clear the speedtest
  const reset = () => {
    setWallets([]);
    setResults([]);
    resetCleanup();
    setStatus("idle");
  };

  // we start the test when the first tx is firing.
  useEffect(() => {
    if (isLoading) {
      setStatus("starting");
    }
  }, [isLoading]);

  return {
    initialWallet,
    status,
    setStatus,
    setResults,
    setWallets,
    wallets,
    cleanupTxs,
    results,
    sendTransaction,
    totalAmount,
    transferPrice,
    reset
  };
};

export default useSpeedTest;
