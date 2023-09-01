import React from 'react';

interface ProgressBarProps {
    /**
     * Is this the principal call to action on the page?
     */
    percentage?: string;
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
export const ProgressBar = ({
    percentage = "0%"
}: ProgressBarProps) => {
    return (
        <div style={{ width: "200px" }} className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: percentage }}></div>
        </div>
    );
};