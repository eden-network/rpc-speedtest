import React from 'react';


interface NewTestButtonProps {
}

export const NewTestButton = ({
}: NewTestButtonProps) => {

    return (
        <div className="text-white text-center text-2xl flex-col space-between">
            <h1>Winner<br></br><span>has been determined</span></h1>
            <button
                className="border-brand-lime rounded-md text-sm"
                onClick={() => {
                }}
            >
                {"Setup a new test"}
            </button>
        </div>
    );
}