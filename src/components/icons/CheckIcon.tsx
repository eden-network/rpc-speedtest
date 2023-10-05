import React from 'react';


interface CheckIconProps {
    color: string;
}

export const CheckIcon = ({
    color
}: CheckIconProps) => {
    return (
        <div className='w-24 flex justify-center lime-300'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke={color} className="w-6 h-6 lime-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </div>
    );
};