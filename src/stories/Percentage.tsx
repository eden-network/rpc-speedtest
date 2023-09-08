import React from 'react';
import { Check } from './icons/Check';

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
                    <Check color={color} />
                    :
                    <span className={`font-bold ${fontWeight}`}>{percentage.toString().concat("%")}</span>
            }
        </div>
    );
};