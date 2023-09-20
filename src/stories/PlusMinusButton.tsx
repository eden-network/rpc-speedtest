import React from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { MinusIcon } from './icons/MinusIcon';

interface PlusMinusButtonProps {
    add: boolean,
    onClick: () => void
}

export const PlusMinusButton = ({
    add,
    onClick
}: PlusMinusButtonProps) => {
    const addOrRemove = add ? <PlusIcon /> : <MinusIcon />

    return (
        <>
            <button onClick={onClick} className='bg-gradient-fresh rounded hover:bg-white'>
                {addOrRemove}
            </button>
        </>
    );
}