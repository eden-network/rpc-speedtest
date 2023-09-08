import React from 'react';
import { ProcessRow } from './ProcessRow';

type Task = {
    percentage: number,
    color?: string,
    name: string,
    isActive: boolean,
}

interface ResultsCardProps {
    title?: string;
    tasks: Task[];
}

export const Tasks = ({
    title = "Processes",
    tasks = [],
}: ResultsCardProps) => {

    const finishedTasks: number = tasks.filter(task => task.percentage === 100).length

    return (
        <div>
            <h1 className="text-xl text-white font-semibold mb-4">{title}</h1>
            <div>
                {tasks.map((item, index) =>
                    <ProcessRow lastCompleted={finishedTasks - 1 === index} numOfFinishedTasks={finishedTasks} indexOfRow={index + 1} isActive={item.isActive} name={item.name} percentage={item.percentage} key={index} />
                )}
            </div>
        </div>
    );
};