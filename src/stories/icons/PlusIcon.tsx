import React from 'react';

interface PlusIconProps {
    css?: string,
    size?: string
}

export const PlusIcon = ({
    css,
    size
}: PlusIconProps) => {
    return (
        <div className={`${css} flex justify-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className={`${size} text-brand-blue`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
    );
};