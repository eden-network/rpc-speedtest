import React from 'react';
import { Copy } from './icons/Copy';
interface CopyButtonProps {
    label: string;
}

/**
 * Primary UI component for user interaction
 */
export const CopyButton = ({
    label
}: CopyButtonProps) => {
    return (
        <button className='flex border border-brand-darkblue px-3 text-xs items-center'>
            <Copy />
            {label}
        </button>
    );
};