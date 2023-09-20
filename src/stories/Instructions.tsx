import React from 'react';

interface InstructionsProps {
}

export const Instructions = ({

}: InstructionsProps) => {

    return (
        <div className="flex-1 bg-white p-6 rounded-2xl drop-shadow-2xl">
            <legend className="text-base text-xl font-semibold leading-6 text-gray-900 pb-4">
                Instructions
            </legend>
            <ol className="list-decimal px-5 pt-4">
                <li className="pb-3">Connect your wallet</li>
                <li className="pb-3">
                    Select a network that supports the RPC Speed Test (Ethereum,
                    Arbitrum, Avalanche, Polygon Mumbai)
                </li>
                <li className="pb-3">
                    Select the RPCs you want to test, and/or add your own by clicking
                    &#34;Add a custom RPC&#34;
                </li>
                <li className="pb-3">Review and modify test details as required</li>
                <li className="pb-3">Click &#34;Start Speed Test&#34;</li>
                <li className="pb-3">
                    Once results are received, the remaining ETH (or other native
                    token) will be refunded to your wallet
                </li>
            </ol>
        </div>
    );
};