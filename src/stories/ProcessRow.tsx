import React from 'react';
import { ProgressBar } from './ProgressBar';
import { Percentage } from './Percentage';

interface ProcessRowProps {
    /**
     * Is this the principal call to action on the page?
     */
    percentage?: string;
    color?: string;
    name?: string;
    completed?: boolean;

    task?: {
        percentage?: string;
        color?: string;
        name?: string;
        completed?: boolean;
    }
    /**
     * What background color to use
     */
    /**
     * Optional click handler
     */
}

/**
 * Primary UI component for user interaction
 */
export const ProcessRow = ({
    percentage = "25%",
    name = "Transfer to the genesis wallet",
    task = {
        percentage: "0%",
        color: ""
    }
}: ProcessRowProps) => {
    let textStyle = ""
    if (percentage === "0%") {
        textStyle = "font-normal text-gray"
    } else {
        textStyle = "font-semibold text-black"
    }
    return (
        <div className="flex items-center mb-4">
            <h1 className={`${textStyle} mr-2`}>{name}</h1>
            <ProgressBar percentage={percentage} />
        </div>
    );
};