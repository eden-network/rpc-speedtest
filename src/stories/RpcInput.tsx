import React from 'react';

interface RpcInputProps {
    rpcUrl: string,
    key?: number
}

export const RpcInput = ({
    rpcUrl,
    key
}: RpcInputProps) => {

    return (
        <div>
            <label className="flex justify-between"
                htmlFor={rpcUrl}
                key={key}
            >
                <div>
                    <span>
                        {rpcUrl}
                    </span>
                </div>
                <div>
                    <input
                        className='ml-10'
                        type="checkbox"
                    />
                </div>
            </label>
        </div>
    );
}