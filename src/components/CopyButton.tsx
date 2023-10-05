import React from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { useState } from 'react';

interface CopyButtonProps {
    label: string;
    url: string;
}

export const CopyButton = ({
    label,
    url
}: CopyButtonProps) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(true);
        copyToClipboard()
        const timeoutHandler = setTimeout(() => setActive(false), 1000)
        // clearTimeout(timeoutHandler)
    };


    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(url);
        } catch (err) {
        }
    }

    return (
        <button onClick={handleClick} className='flex border border-brand-blue px-3 text-xs items-center'>
            <CopyIcon active={active} />
            {label}
        </button>
    );
}