import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { arbitrum, mainnet, polygonMumbai,avalanche } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { DEFAULT_RPC_URL } from "./core/rpcs"

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, arbitrum, polygonMumbai,avalanche],
  [
    // set default jsonrpc per chain, preferred over publicprovider which is unreliable
    jsonRpcProvider({
      rpc(chain) {
        const rpcUrl = DEFAULT_RPC_URL[chain.id]
        if (rpcUrl === undefined) {
          throw new Error("RPC not found")
        }

        return {
          http: rpcUrl
        }
      },
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RPC Speedtest",
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export { chains };
