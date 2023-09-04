import React from 'react';
import Image from 'next/image'

interface PercentageProps {
    percentage: string;
    completed: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Percentage = ({
    percentage = "25%",
    completed = false
}: PercentageProps) => {
    if (percentage === "100%") {
        completed = true
    }
    return (
        <div>
            {completed ? <Image className='ml-2' alt='completed' src={require('../../public/completed.png').default} /> : <span className="font-semibold text-black ml-2">{percentage}</span>}
        </div>
    );
};