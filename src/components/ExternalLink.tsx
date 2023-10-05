const ExternalLink = ({
    style,
    url,
    content,
    onClick
}: {
    style: string,
    url?: string,
    content?: string,
    onClick?: () => void,
}) => {

    return (
        <a onClick={onClick} className={style}
            href={url}
            target="_blank"
            rel="nofollow noreferrer">
            {content}
        </a>
    );
};

export default ExternalLink;
