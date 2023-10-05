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
    title = "Test progress",
    tasks = [],
}: ResultsCardProps) => {

    const finishedTasks: number = tasks.filter(task => task.percentage === 100).length
    const allCompleted: boolean = finishedTasks === tasks.length

    return (
        <div className='py-6'>
            <h1 className="text-xl text-white font-semibold mb-4">{title}</h1>
            <div>
                {tasks.map((item, index) =>
                    <ProcessRow
                        allCompleted={allCompleted}
                        lastCompleted={finishedTasks - 1 === index}
                        numOfFinishedTasks={finishedTasks} indexOfRow={index + 1}
                        isActive={item.isActive}
                        name={item.name}
                        percentage={item.percentage}
                        key={index}
                    />
                )}
            </div>
            <div className='mt-6 flex mx-auto bg-gradient-fresh p- w-fit p-0.5 rounded'>
                <button className='transition-all bg-brand-blue rounded text-white hover:text-brand-darkgreen mx-auto px-4 py-1 text-sm'>How to add a new RPC to wallet</button>
            </div>
        </div>
    );
};