import React from 'react';
import { PlusIcon } from '../icons/PlusIcon';
import { MinusIcon } from '../icons/MinusIcon';

interface CounterButtonProps {
    add: boolean,
    onClick: () => void
}

export const CounterButton = ({
    add,
    onClick
}: CounterButtonProps) => {
    const addOrRemove = add ? <PlusIcon /> : <MinusIcon />

    return (
        <>
            <button onClick={onClick} className='bg-gradient-to-r from-brand-lime to-brand-green hover:from-brand-hover hover:to-brand-hover rounded p-1'>
                {addOrRemove}
            </button>
        </>
    );
}