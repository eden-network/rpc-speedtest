import React from 'react';
import { ProcessRow } from './ProcessRow';

interface ResultsCardProps {
    title?: string;
    tasks?: [{
        name?: string,
        percentage?: string
    },
        {
            name?: string,
            percentage?: string
        },
        {
            name?: string,
            percentage?: string
        }];
}[]

export const Tasks = ({
    title = "Tasks",
    tasks = [
        {
            name: "Transfer to the Genesis Wallet",
            percentage: "0%"
        },
        {
            name: "Create SpeedTest wallets",
            percentage: "20%"
        },
        {
            name: "Transfer to wallets",
            percentage: "100%"
        },
    ]
}: ResultsCardProps) => {
    return (
        <div>
            <h1 className="text-lg font-semibold mb-4">{title}</h1>
            <div>
                {tasks.map((item, index) =>
                    <ProcessRow name={item.name} percentage={item.percentage} key={index} />
                )}
            </div>
        </div>
    );
};