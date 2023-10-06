const ExternalLink = ({
    style,
    url,
    content,
    onClick,
    children
}: {
    style: string,
    url?: string,
    content?: string,
    onClick?: () => void,
    children?: React.ReactNode
}) => {

    return (
        <a onClick={onClick} className={style}
            href={url}
            target="_blank"
            rel="nofollow noreferrer">
            {children}{content}
        </a>
    );
};

export default ExternalLink;
