import React from 'react';

interface ToolTipProps {
    children: React.ReactNode
    loops: number
}

export const ToolTip = ({
    children,
    loops
}: ToolTipProps) => {

    const isTooltip: string = loops >= 3 ? "" : "scale-100"

    return (
        <div className={`group relative flex`}>
            <span className={`w-56 right-[-32px] absolute border transition-all border-white bottom-10 scale-0 rounded-md bg-brand-blue p-2 text-xs text-white ${isTooltip}`}>
                <b>Did you know?</b>
                <br></br><br></br>
                The accuracy of the test could be improved by using a larger sample size. We suggest using at least 4 loops.
            </span>
            {children}
        </div>
    )
}