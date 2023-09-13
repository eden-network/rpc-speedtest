import React from 'react';
import { CopyButton } from './CopyButton';

type RpcRow = {
    rank: number,
    rpc: string,
    first: number,
    second: number,
    third: number,
    isFirst?: boolean
}

interface ScoreBoardProps {
    rows: RpcRow[]
}

export const ScoreBoard = ({
    rows = []
}: ScoreBoardProps) => {

    const isFirst = rows.map((item, index) => {
        item.rank === 1 ? item.isFirst = true : item.isFirst = false
    })

    return (
        <div className="text-brand-darkblue text-center font-bold bg-gradient-eden p-8 rounded-md">
            <table className="border-separate border-spacing-y-0.5">
                <caption className="text-2xl">{"RPC Speed Test"}</caption>
                <thead className="">
                    <tr className="font-semibold text-base">
                        <th className="text-left">
                            {"Rank"}
                        </th>
                        <th className="text-left px-2">
                            {"RPC"}
                        </th>
                        <th className="px-4">
                            {"1ST"}
                        </th>
                        <th className="px-4">
                            {"2ND"}
                        </th>
                        <th className="px-4">
                            {"3RD"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, index) =>
                        <tr className={item.isFirst ? "bg-white/80" : "bg-white/40"} key={index}>
                            <td className="bg-brand-darkblue text-white text-xl font-medium px-5 py-4 leading-none">
                                {item.rank}
                            </td>
                            <td className="px-2 font-semibold">
                                {item.rpc}
                            </td>
                            <td>
                                {item.first}
                            </td>
                            <td>
                                {item.second}
                            </td>
                            <td>
                                {item.third}
                            </td>
                            <td className="px-4 pl-8">
                                <CopyButton label="Copy" />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};