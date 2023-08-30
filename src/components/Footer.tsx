function Footer() {

    return (
        <footer className="bg-brand-blue text-white">
            <div className="mx-auto container max-w-7xl px-4 md:px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-600 pb-6 mb-6">
                    <nav>
                        <h4 className="text-brand-lime font-bold">{"Products"}</h4>
                        <ul className="space-y-2 mt-4">
                            <li className="">
                                <a
                                    rel="nofollow noreferrer"
                                    href="https://docs.edennetwork.io/eden-rpc/overview"
                                    className="hover:text-brand-lime"
                                    target="_blank"
                                >
                                    Eden RPC
                                </a>
                            </li>
                            <li className="">
                                <a
                                    rel="nofollow noreferrer"
                                    href="https://docs.edennetwork.io/eden-relay/overview"
                                    className="hover:text-brand-lime"
                                    target="_blank"
                                >
                                    Eden Relay
                                </a>
                            </li>
                            <li className="">
                                <a
                                    rel="nofollow noreferrer"
                                    href="https://docs.edennetwork.io/eden-bundles/overview"
                                    className="hover:text-brand-lime"
                                    target="_blank"
                                >
                                    Eden Bundles
                                </a>
                            </li>
                            <li className="">
                                <a
                                    rel="nofollow noreferrer"
                                    href="https://yieldyak.com/liquid-staking"
                                    className="hover:text-brand-lime"
                                    target="_blank"
                                >
                                    yyAVAX on Yield Yak
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <h4 className="text-brand-lime font-bold">{"Developers"}</h4>
                        <ul className="mt-4 space-y-2">
                            <li className="">
                                <a
                                    href="https://docs.edennetwork.io/"
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    className="hover:text-brand-lime"
                                >
                                    Docs
                                </a>
                            </li>
                            <li className="">
                                <a
                                    href="https://github.com/eden-network/"
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    className="hover:text-brand-lime"
                                >
                                    GitHub
                                </a>
                            </li>
                            <li className="">
                                <a
                                    href="https://github.com/0xprotect"
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    className="hover:text-brand-lime"
                                >
                                    0xProtect
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <h4 className="text-brand-lime font-bold">{"Company"}</h4>
                        <ul className="mt-4 space-y-2">
                            <li className="">
                                <a
                                    href="https://www.linkedin.com/company/edennetwork/"
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    className="hover:text-brand-lime"
                                >
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <nav>
                        <h4 className="text-brand-lime font-bold">{"Community"}</h4>
                        <ul className="mt-4 space-y-2">
                            <li className="">
                                <a
                                    href="https://discord.gg/ZhB9mpWWG3"
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    className="hover:text-brand-lime"
                                >
                                    Discord
                                </a>
                            </li>
                            <li className="">
                                <a
                                    href="https://twitter.com/edennetwork"
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    className="hover:text-brand-lime"
                                >
                                    Twitter
                                </a>
                            </li>
                            <li className="">
                                <a
                                    href="https://medium.com/EdenNetwork"
                                    target="_blank"
                                    rel="nofollow noreferrer"
                                    className="hover:text-brand-lime"
                                >
                                    Medium
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center">
                    <img src="eden-logo-white.svg" alt="Eden" className="h-8 mr-8" />
                    <span className="text-gray-500 text-sm">
                        &copy;{" Goe Network Ltd "}
                        {new Date().getFullYear()}
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
