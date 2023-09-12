import React from 'react';

interface ScoreBoardProps {
}

export const ScoreBoard = ({
}: ScoreBoardProps) => {

    return (
        <div className="text-white text-center font-bold">
            <h1 className="text-2xl">{"RPC Speed Test"}</h1>
            <table>
                <thead>
                    <tr className="font-semibold text-base">
                        <th>
                            {"Rank"}
                        </th>
                        <th className="text-left">
                            {"RPC"}
                        </th>
                        <th>
                            {"1ST"}
                        </th>
                        <th>
                            {"2ST"}
                        </th>
                        <th>
                            {"3RD"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            https://polygon-testnet.public.blastapi.io
                        </td>
                        <td>
                            3
                        </td>
                        <td>
                            2
                        </td>
                        <td>
                            0
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};