import React from 'react';
import { RpcInput } from './RpcInput';
import { AddRpcButton } from './buttons/AddRpcButton';


type Rpc = {
    url: string
}

interface SelectedRpcsProps {
    rpcData: Rpc[]
}

export const SelectedRpcs = ({
    rpcData = []

}: SelectedRpcsProps) => {
    const rpcCount: number = rpcData.length

    return (
        <div className="bg-white p-6 rounded-md">
            <div className="flex justify-between mb-4">
                <h1>
                    {"Selected RPCS"}
                </h1>
                <span>
                    {"Selected: "}
                    <span>
                        {rpcCount}
                    </span>
                </span>
            </div>
            {rpcData.map((rpc, i) =>
                <RpcInput rpcUrl={rpc.url} key={i}></RpcInput>
            )}
            <div className='flex'>
                <input
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                    placeholder="e.g. https://some-rpc.com/"
                >
                </input>
                <input
                    className='ml-10'
                    type="checkbox"
                    checked
                />
            </div>
            <AddRpcButton />
        </div>
    );
}