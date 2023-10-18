import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import "../globals.css";
import { chains, client } from "../wagmi";

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "linear-gradient(90.81deg, #CAFF00 16.58%, #14D674 61.13%)",
          borderRadius: "medium",
          accentColorForeground: "#171b47",
        })}
      >
        <Head>
          <title>RPC Speed Test</title>
          <meta
            name="description"
            content="Accurately Measure Transaction Propagation Speeds from Your Browser"
          />
          <meta
            name="keywords"
            content="RPC, Speed Test, Eden Network, Transaction, Propagation, Speed"
          />
          <link rel="icon" href="rpcst_logo.png" />
        </Head>

        {mounted && <Component {...pageProps} />}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
