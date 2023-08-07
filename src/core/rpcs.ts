import { mainnet } from "wagmi";
import { arbitrum, avalanche, polygonMumbai } from "wagmi/chains";

// Used for speed testing defaults
export const RPC_URLS = {
  [mainnet.id]: [
    "https://speed-eu-west.edennetwork.io",
    "https://speed-us-east.edennetwork.io",
    "https://rpc.ankr.com/eth",
    "https://eth.llamarpc.com/",
    "https://api.securerpc.com/v1",
    "https://rpc.flashbots.net/",
    "https://api.edennetwork.io/v1/rocket",
    "https://eth.rpc.blxrbdn.com/",
  ],
  [arbitrum.id]: [
    "https://arb1.arbitrum.io/rpc",
    "https://rpc.ankr.com/arbitrum",
    "https://arbitrum-one.public.blastapi.io",
    "https://arb-mainnet.g.alchemy.com/v2/demo",
  ],
  [polygonMumbai.id]: [
    "https://polygon-mumbai.blockpi.network/v1/rpc/public",
    "https://polygon-testnet.public.blastapi.io",
    "https://rpc.ankr.com/polygon_mumbai",
    "https://polygon-mumbai.g.alchemy.com/v2/demo",
    "https://matic-mumbai.chainstacklabs.com",
  ],
  [avalanche.id]: [
    "https://rpc.ankr.com/avalanche	",
    "https://api.avax.network/ext/bc/C/rpc",
    "https://avax.meowrpc.com",
    "https://avalanche.public-rpc.com",
    "https://1rpc.io/avax/c",
  ],
};

// used for wallet seeding txs
export const DEFAULT_RPC_URL: Record<number, string> = {
  [mainnet.id]: "https://rpc.ankr.com/eth",
  [arbitrum.id]: "https://rpc.ankr.com/arbitrum",
  [polygonMumbai.id]: "https://rpc.ankr.com/polygon_mumbai",
  [avalanche.id]: "https://rpc.ankr.com/avalanche",
};
