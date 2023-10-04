import React from 'react';
import { CopyButton } from './buttons/CopyButton';
import { EdenIcon } from './icons/EdenIcon';
import { EdenText } from './icons/EdenText';

type Rpc = {
    label: string,
    first: number,
    second: number,
    third: number,
}

interface ScoreBoardProps {
    rpcData: Rpc[],
    status?: string,
}

export const ScoreBoard = ({
    rpcData = [],
    status,
}: ScoreBoardProps) => {

    const rpcsRanked = rpcData.sort((a: Rpc, b: Rpc): number => {
        const sorted = b.first - a.first;
        return sorted;
    })

    // const isWinner: string = status === "success" ? "bg-white/80 animate-pulse" : "bg-white/40"
    const testCompleted: boolean = status === "success" ? true : false
    const isRanked: boolean = status === "running" || status === "success" ? true : false


    // {index + 1}

    return (
        <div className="text-brand-blue text-center font-bold bg-gradient-fresh p-6 rounded-md h-fit mb-6">
            <table className="table-auto border-separate border-spacing-y-0.5">
                <caption className="text-2xl mb-4">{"RPC Speed Test"}</caption>
                <thead className="">
                    <tr className="font-semibold text-base">
                        <th className="text-left">
                            {"Rank"}
                        </th>
                        <th className="text-left px-2">
                            {"RPC"}
                        </th>
                        <th className="px-2">
                            {"1ST"}
                        </th>
                        <th className="px-2">
                            {"2ND"}
                        </th>
                        <th className="px-2">
                            {"3RD"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rpcsRanked.map((rpc, index) =>
                        <tr className={index === 0 && testCompleted ? "bg-white/80" : "bg-white/40"} key={index}>
                            <td className="bg-brand-blue text-white text-xl font-medium px-5 py-4 leading-none">
                                {isRanked ? index + 1 : "-"}
                            </td>

                            <td className="px-2 font-semibold mr-60 text-left truncate">
                                {rpc.label.slice(8)}
                            </td>
                            <td>
                                {rpc.first}
                            </td>
                            <td>
                                {rpc.second}
                            </td>
                            <td>
                                {rpc.third}
                            </td>
                            <td className="px-4 pl-8">
                                <CopyButton label="Copy" url={rpc.label} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex justify-end mt-6 gap-2">
                <h1 className="flex items-end">{"Powered by"}</h1>
                <EdenIcon />
                <EdenText />
            </div>
        </div>
    );
};