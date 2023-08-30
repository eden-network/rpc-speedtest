const ExternalLink = ({
    style,
    url,
    content
}: {
    style: string,
    url: string,
    content: string
}) => {


    return (
        <a className={style}
            href={url}
            target="_blank"
            rel="nofollow noreferrer">
            {content}
        </a>
    );
};

export default ExternalLink;
