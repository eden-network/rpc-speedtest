import React from 'react';
import { formatNumber } from '../utils/formatNumber';
import { formatEther } from 'ethers/lib/utils.js';
import { BigNumber } from 'ethers';


interface StartButtonProps {
    amount: BigNumber,
    currency: string,
    wallets: number,
    loops: number,
    isConnected?: boolean,
    onClick: () => void,
    initialWallet: object,
    rpcUrls: number
}

export const StartButton = ({
    amount,
    currency,
    wallets,
    loops,
    isConnected,
    onClick,
    initialWallet,
    rpcUrls

}: StartButtonProps) => {

    const isActive: string = isConnected ? "bg-gradient-fresh text-brand-blue" : "bg-brand-gray text-brand-textGray"
    return (
        <div className='text-center mt-4'>
            <button
                onClick={onClick}
                className={`${isActive} rounded-md px-12 py-2.5 text-3xl font-semibold shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-75`}
                disabled={!initialWallet || !rpcUrls || !isConnected}
            >
                Start SpeedTest
            </button>
            <div className='mt-2 text-white text-center'>
                {isConnected ?
                    <h1>
                        {"Beginning the test will transfer "}
                        <span className="font-bold">
                            {formatNumber(Number(formatEther(amount)), { maximumSignificantDigits: 2 })} {currency}
                        </span>
                        {" to the Genesis Wallet, create "}
                        <span className="font-bold">
                            {wallets} {"Speed Test"}
                        </span>
                        {" wallets, and send "}
                        <span className="font-bold">
                            {loops} {"transactions "}
                        </span>
                        {"from each."}
                    </h1>
                    :
                    <h1>Please connect wallet to start the test</h1>
                }
            </div>
        </div >

    );
}