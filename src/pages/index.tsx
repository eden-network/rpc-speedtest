import { ConnectButton } from "@rainbow-me/rainbowkit";
import Speedtest from "../components/Speedtest";

function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-6 headerBg">
        <nav
          className="flex items-center justify-between py-6"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            
              
              <span className="font-bold text-xl text-white lp-10">
                RPC Speed Test by     
              </span>
              <img src="eden-logo-white.svg" />
            
          </div>

          <div className="flex lg:flex-1 lg:justify-end">
            <ConnectButton />
          </div>
        </nav>
      </div>
      <main className="flex-1 flex flex-col">
        <Speedtest />
      </main>
      <footer>
        <div className="flex footerBg">
          <img src="eden-logo-white.svg" />
        </div>
      </footer>
    </div>
  );
}

export default Page;
