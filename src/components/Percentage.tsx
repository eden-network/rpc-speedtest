import React from 'react';
import { CheckIcon } from './icons/CheckIcon';

interface PercentageProps {
    percentage: number;
    lastCompleted?: boolean;
    allFinished: boolean
}

export const Percentage = ({
    percentage,
    lastCompleted,
    allFinished

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
        color = "#9DFF61"
    }

    if (allFinished) {
        color = "#9DFF61"
    }
    return (
        <div className='w-10 flex justify-center'>
            {
                completed ?
                    <CheckIcon color={color} />
                    :
                    <span className={`font-bold ${fontWeight}`}>{Math.trunc(percentage).toString().concat("%")}</span>
            }
        </div>
    );
};