import React from 'react';
import { PlusIcon } from '../icons/PlusIcon';

interface AddRpcProps {
}

export const AddRpcButton = ({
}: AddRpcProps) => {

    return (
        <div className='w-56 flex justify-between p-2 mt-4 rounded-md border border-brand-blue text-brand-blue'>
            <button>
                {"Add a custom RPC"}
            </button>
            <PlusIcon css='border rounded-full border-brand-blue' size='w-4 h-4' />
        </div>
    );
}