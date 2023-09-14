import React from 'react';
import { Copy } from './icons/Copy';
import { CopySolid } from './icons/CopySolid';
import { useState } from 'react';

interface CopyButtonProps {
    label: string;
    url: string;
}

export const CopyButton = ({
    label,
    url
}: CopyButtonProps) => {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        setVisible(true);
        copyToClipboard()
        setTimeout(() => setVisible(false), 1000)
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
            console.log('Url copied to clipboard');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    return (

        <button onClick={handleClick} className='flex border border-brand-darkblue px-3 text-xs items-center'>
            {visible ? <CopySolid /> : <Copy />}
            {label}
        </button>
    );
}