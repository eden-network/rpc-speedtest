import React from 'react';
import { useState } from "react";
import TestWallets from "./TestWallets";
import ExternalLink from './ExternalLink';

interface FaqProps {
    isConnected: boolean
}
export const Faq = ({
    isConnected
}: FaqProps) => {

    const [showTestWallets, setShowTestWallets] = useState(false);

    return (
        <div className="relative flex-1 bg-white p-6 rounded-2xl drop-shadow-2xl">
            <legend className="text-base text-xl font-semibold leading-6 text-gray-900 pb-4">
                FAQ
            </legend>
            <ul className="list-none">
                <li>
                    <b>
                        How does the RPC Speed Test measure transaction propagation
                        speed?
                    </b>
                </li>
                <p className="pb-3">
                    It sends multiple identical transactions to all selected RPCs at
                    once, then compares block number and transaction order to
                    determine the fastest RPC. The more loops you test, the more
                    accurate the results will be.
                </p>
                <li>
                    <b>
                        Does the app store any user information (wallets, IPs, etc.)?
                    </b>
                </li>
                <p className="pb-3">
                    No, the app only keeps a local state in the browser and no user
                    info is shared or stored online.
                </p>
                <li>
                    <b>Is the code open source?</b>
                </li>
                <p className="pb-3">
                    Yes, you can review the code and methodology on {" "}
                    <ExternalLink style="text-black underline hover:no-underline" url="https://github.com/eden-network/rpc-speedtest" content="Github"></ExternalLink>.
                </p>
                <li>
                    <b>
                        What happens if the test is interrupted by closing or refreshing the browser window?
                    </b>
                </li>
                {isConnected ?
                    <p>
                        Click on SpeedTest Wallets button on top of the page to reclaim funds.
                    </p>
                    :
                    <p>
                        Funds can be reclaimed from the SpeedTest wallets and the addresses will be provided once they are generated.
                    </p>
                }
            </ul>
        </div>
    );
};