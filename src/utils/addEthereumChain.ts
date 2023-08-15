import { Chain } from "wagmi";

function extractDomain(url: string) {
  const regex = /^(?:https?:\/\/)?([^\/]+)/i;
  const match = url.match(regex);

  return match ? match[1] : url;
}

export const addEthereumChain = async ({
  chain,
  rpcUrl,
}: {
  chain: Chain;
  rpcUrl: string;
}) => {
  const client = window.ethereum;
  const chainId = `0x${chain.id.toString(16)}`;

  const addChainParams = {
    chainId,
    chainName: extractDomain(rpcUrl),
    nativeCurrency: chain.nativeCurrency,
    rpcUrls: [rpcUrl],
  };

  try {
    await client?.request({
      method: "wallet_addEthereumChain",
      params: [addChainParams],
    });
  } catch (switchError: any) {
    // user closed the popup
    if (switchError?.code === 4001) {
      return;
    }
    window.alert("Error adding RPC");
  }
};
