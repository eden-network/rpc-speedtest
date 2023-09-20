import React from 'react';

interface ExternalLinkProps {
    style: string,
    url?: string,
    content?: string,
    onClick?: () => void,
}

export const ExternalLinkButton = ({
    style,
    url,
    content,
    onClick

}: ExternalLinkProps) => {

    return (
        <>
            <a onClick={onClick} className={style}
                href={url}
                target="_blank"
                rel="nofollow noreferrer">
                {content}
            </a>
        </>
    );
}