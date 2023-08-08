const Instructions = () => {
  return (
    <aside>
      <legend className="text-base font-semibold leading-6 text-gray-900">
        {"Instructions"}
      </legend>
      <dl className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
        <div className={`flex items-center p-2`}>
          <ol className="numList text-sm leading-6 font-medium text-gray-900">
            <li>Connect your wallet</li>
            <li>Select a network that supports the RPC Speed Test (Ethereum, Arbitrum, Avalanche, Polygon Mumbai)</li>
            <li>Select the RPCs you want to test, and/or add your own by clicking &apos;+ Custom RPC&apos;</li>
            <li>Review and modify test details as required</li>
            <li>Click &apos;Start Speed Test&apos;</li>
            <li>Once results are received, the remaining ETH (or other native token) will be refunded to your wallet</li>
          </ol>
        </div>
      </dl>
    </aside>
  );
};

export default Instructions;
