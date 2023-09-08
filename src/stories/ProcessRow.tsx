import React from 'react';
import { ProgressBar } from './ProgressBar';

interface ProcessRowProps {

    percentage: number;
    color?: string;
    name?: string;
    isActive: boolean;
    numOfFinishedTasks: number;
    indexOfRow: number;
    lastCompleted?: boolean;
}

export const ProcessRow = ({
    percentage,
    color,
    isActive,
    name,
    lastCompleted
}: ProcessRowProps) => {
    let fontWeight = ""
    if (percentage === 0) {
        fontWeight = "font-normal text-gray-500"
    } else {
        fontWeight = "font-semibold text-white"
    }
    return (

        <div className="flex items-center mb-4 h-10">
            <h1 className={`w-32 font-semibold ${fontWeight} mr-4`}>{name}</h1>
            <ProgressBar lastCompleted={lastCompleted} isActive={isActive} percentage={percentage} />
        </div>
    );
};