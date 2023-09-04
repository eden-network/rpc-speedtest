import React from 'react';
import { Percentage } from './Percentage';

interface ProgressBarProps {
    percentage?: string;
    color?: string
    completed?: boolean
}
export const ProgressBar = ({
    percentage = "25%",
    color = "bg-emerald-400",
    completed = false
}: ProgressBarProps) => {
    if (percentage === "0%") {
        color = "bg-blueGray-300",
            completed = false
    } else if (percentage === "100%") {
        color = "bg-lime-300",
            completed = true
    } else {
        color = "bg-emerald-400",
            completed = false
    }
    return (
        <div className="flex items-center">
            <div style={{ width: "300px" }} className="bg-gray-200 rounded-md h-4 dark:bg-blueGray-300">
                <div className={`${color} h-4 rounded-md`} style={{ width: percentage }}></div>
            </div>
            <Percentage percentage={percentage} completed={completed} />
        </div>
    );
};