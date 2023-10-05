import React from 'react';


interface WinnerProps {
    onClick: () => void,
}

export const Winner = ({
    onClick
}: WinnerProps) => {

    return (
        <div className="flex flex-col justify-evenly text-white text-center text-2xl mb-6">
            <h1 className='text-6xl leading-10'>Winner<br></br><span className='text-3xl'>has been determined!</span></h1>
            <button
                className="border-brand-lime border rounded-md text-sm px-3 py-1"
                onClick={onClick}
            >
                {"Add winner to Metamask"}
            </button>
        </div>
    );
}