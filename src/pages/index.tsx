import { ConnectButton } from "@rainbow-me/rainbowkit";
import Speedtest from "../components/Speedtest";

function Page() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="bg-brand-blue">
        <nav
          className="flex items-center justify-between p-6 mx-auto container max-w-7xl"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 items-center">
            <span className="font-bold mr-2 text-xl text-white">
              RPC Speed Test by
            </span>
            <img src="eden-logo-white.svg" alt="Eden" className="h-8" />
          </div>

          <div className="flex lg:flex-1 lg:justify-end">
            <ConnectButton />
          </div>
        </nav>
      </div>
      <main className="flex-1 flex flex-col">
        <Speedtest />
      </main>
      <footer className="pb-6 bg-brand-blue">
        <div className="flex mx-auto container max-w-7xl px-6">
          <img src="eden-logo-white.svg" alt="Eden" className="h-8" />
        </div>
      </footer>
    </div>
  );
}

export default Page;
