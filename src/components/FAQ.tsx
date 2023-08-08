const FAQ = () => {
  return (
    <aside>
      <legend className="text-base font-semibold leading-6 text-gray-900">
        {"Faq"}
      </legend>
      <dl className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
        <div className={`flex items-center p-2`}>
          <dt className="min-w-0 flex-1 text-sm leading-6 font-medium text-gray-900">
            {"How does the RPC Speed Test measure transaction propagation speed?"}
            <p className="text-gray-500 text-sm">
              {"It sends multiple identical transactions to all selected RPCs at once, then compares block number and transaction order to determine the fastest RPC."}
            </p>
          </dt>
        </div>
        <div className={`flex items-center p-2`}>
          <dt className="min-w-0 flex-1 text-sm leading-6 font-medium text-gray-900">
            {"How many loops should I choose?"}
            <p className="text-gray-500 text-sm">
              {"The more loops you test, the higher your sample size will be."}
            </p>
          </dt>
        </div>
        <div className={`flex items-center p-2`}>
          <dt className="min-w-0 flex-1 text-sm leading-6 font-medium text-gray-900">
            {"What is a Burner Wallet?"}
            <p className="text-gray-500 text-sm">
              {"Burner wallets are randomly generated in your local browser. These are suitable for very short-term testing but not much else."}
            </p>
          </dt>
        </div>
        <div className={`flex items-center p-2`}>
          <dt className="min-w-0 flex-1 text-sm leading-6 font-medium text-gray-900">
            {"Why does the app use Burner Wallets?"}
            <p className="text-gray-500 text-sm">
              {"Some transactions may be treated differently if they are sent by wallets with different nonces. This ensures the conditions between each test are as similar as possible."}
            </p>
          </dt>
        </div>
        <div className={`flex items-center p-2`}>
          <dt className="min-w-0 flex-1 text-sm leading-6 font-medium text-gray-900">
            {"Does the app store any user information (wallets, IPs, etc.)?"}
            <p className="text-gray-500 text-sm">
              {"No, the app only keeps a local state in the browser and no user info is shared or stored online."}
            </p>
          </dt>
        </div>
        <div className={`flex items-center p-2`}>
          <dt className="min-w-0 flex-1 text-sm leading-6 font-medium text-gray-900">
            {"Is the code open source?"}
            <p className="text-gray-500 text-sm">
              {"Yes, you can review the code and methodology"} <a className="linkGithub" href="https://github.com/eden-network/rpc-speedtest" target="_blank">on GitHub</a>{"."}
            </p>
          </dt>
        </div>
      </dl>
    </aside>
  );
};

export default FAQ;
