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
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const handleClick = () => {
        setActive(true);
        copyToClipboard()
        if (timeoutId != null) {
            clearTimeout(timeoutId)
        }
        setTimeoutId(setTimeout(() => setActive(false), 1000))
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