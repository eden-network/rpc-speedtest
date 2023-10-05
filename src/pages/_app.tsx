import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, lightTheme } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import NextHead from "next/head";
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
        <NextHead>
          <title>RPC Speed Test</title>
        </NextHead>

        {mounted && <Component {...pageProps} />}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
