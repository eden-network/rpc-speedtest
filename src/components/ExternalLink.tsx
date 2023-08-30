const ExternalLink = ({
    url,
    content
}: {
    url: string,
    content: string
}) => {


    return (
        <a className="text-brand-green underline hover:no-underline" href={url} target="_blank">
            {content}
        </a>
    );
};

export default ExternalLink;
