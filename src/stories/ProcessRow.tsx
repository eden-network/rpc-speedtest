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
    allCompleted: boolean
}

export const ProcessRow = ({
    percentage,
    color,
    isActive,
    name,
    lastCompleted,
    allCompleted
}: ProcessRowProps) => {
    let fontWeight = ""
    if (percentage === 0) {
        fontWeight = "font-normal text-gray-500"
    } else {
        fontWeight = "font-semibold text-white"
    }
    return (

        <div className="flex items-center mb-2 h-10">
            <h1 className={`w-40 font-semibold leading-tight ${fontWeight} mr-4`}>{name}</h1>
            <ProgressBar allCompleted={allCompleted} lastCompleted={lastCompleted} isActive={isActive} percentage={percentage} />
        </div>
    );
};