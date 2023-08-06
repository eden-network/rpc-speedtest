import { mainnet } from "wagmi";
import { arbitrum, polygonMumbai } from "wagmi/chains";

// Used for speed testing defaults
export const RPC_URLS = {
  [mainnet.id]: [
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
};

// used for wallet seeding txs
export const DEFAULT_RPC_URL = {
  [mainnet.id]: "https://rpc.ankr.com/eth",
  [arbitrum.id]: "https://rpc.ankr.com/arbitrum",
  [polygonMumbai.id]: "https://rpc.ankr.com/polygon_mumbai",
};
