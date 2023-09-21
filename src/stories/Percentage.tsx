import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

interface PercentageProps {
    percentage: number;
    lastCompleted?: boolean;
}

export const Percentage = ({
    percentage,
    lastCompleted

}: PercentageProps) => {

    let completed: boolean = false
    let color: string = ""
    let fontWeight: string = ""
    if (percentage === 100) {
        completed = true
    }
    if (percentage === 0) {
        fontWeight = "text-gray-500"
    } else {
        fontWeight = "text-white"
    }

    if (lastCompleted) {
        color = "#49DA9D"
    } else {
        color = "#dce775"
    }
    return (
        <div className='w-24 flex justify-center'>
            {
                completed ?
                    <CheckIcon color={color} />
                    :
                    <span className={`font-bold ${fontWeight}`}>{Math.trunc(percentage).toString().concat("%")}</span>
            }
        </div>
    );
};