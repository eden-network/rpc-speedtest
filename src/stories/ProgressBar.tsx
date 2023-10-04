import React from 'react';
import { Percentage } from './Percentage';
// import './progressbar.css';

interface ProgressBarProps {
    percentage: number;
    color?: string;
    isActive: boolean;
    lastCompleted?: boolean;
    allCompleted: boolean
}
export const ProgressBar = ({
    percentage,
    color,
    isActive,
    lastCompleted,
    allCompleted
}: ProgressBarProps) => {

    let foreGroundColor = color === undefined ? "bg-black" : color

    if (percentage === 0) {
        //this is color for waiting task
        foreGroundColor = "bg-neutral-400"
    }
    else if (percentage === 100) {
        //this is color for completed task
        foreGroundColor = "bg-brand-completed"
    }
    else {
        //this is color for in progress task
        foreGroundColor = "animation-inprogress"
    }

    if (lastCompleted) {
        //this is color for the last completed task
        foreGroundColor = "bg-emerald-400"
    }

    if (allCompleted) {
        foreGroundColor = "bg-brand-completed"
    }

    let isBgAnimated: boolean = percentage === 0 && isActive === true
    isBgAnimated ? "animation" : ""
    // let lastCompleted: boolean = finishedTasks - 1 === index - 1

    return (
        <div className="flex items-center">
            <div
                style={{ width: "150px", backgroundSize: "200% 200%" }}
                className={`rounded-md h-4 dark:bg-neutral-400 ${isBgAnimated ? "animation-waiting" : ""}`}
            >
                <div
                    className={`${foreGroundColor} h-4 rounded-md`}
                    style={{ width: percentage.toString().concat("%") }}>
                </div>
            </div>
            <Percentage
                allFinished={allCompleted}
                lastCompleted={lastCompleted}
                percentage={percentage} />
        </div>
    );
};