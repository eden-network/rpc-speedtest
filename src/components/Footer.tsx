import ExternalLink from "./ExternalLink";

function Footer() {

    return (
        <footer className="bg-brand-blue text-white">
            <div className="mx-auto container max-w-7xl px-4 md:px-6 py-10">
                <div className="lg:flex lg:justify-between grid grid-cols-2 gap-4 border-b border-gray-600 pb-6 mb-6 flex lg:text-left">
                    <nav className="flex flex-col">
                        <h4 className="text-brand-lime font-bold">{"Products"}</h4>
                        <ul className="space-y-2 mt-4">
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://docs.edennetwork.io/eden-rpc/overview" content="Eden RPC" />
                            </li>
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://docs.edennetwork.io/eden-relay/overview" content="Eden Relay" />
                            </li>
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://docs.edennetwork.io/eden-bundles/overview" content="Eden Bundles" />
                            </li>
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://yieldyak.com/liquid-staking" content="yyAVAX on Yield Yak" />
                            </li>
                        </ul>
                    </nav>
                    <nav className="flex flex-col">
                        <h4 className="text-brand-lime font-bold">{"Developers"}</h4>
                        <ul className="mt-4 space-y-2">
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://docs.edennetwork.io/" content="Docs" />
                            </li>
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://github.com/eden-network/" content="GitHub" />
                            </li>
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://github.com/0xprotect" content="0xProtect" />
                            </li>
                        </ul>
                    </nav>
                    <nav className="flex flex-col">
                        <h4 className="text-brand-lime font-bold">{"Company"}</h4>
                        <ul className="mt-4 space-y-2">
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://www.linkedin.com/company/edennetwork/" content="LinkedIn" />
                            </li>
                        </ul>
                    </nav>
                    <nav className="flex flex-col">
                        <h4 className="text-brand-lime font-bold">{"Community"}</h4>
                        <ul className="mt-4 space-y-2">
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://discord.gg/ZhB9mpWWG3" content="Community" />
                            </li>
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://twitter.com/edennetwork" content="Twitter" />
                            </li>
                            <li className="">
                                <ExternalLink style="hover:text-brand-lime" url="https://medium.com/EdenNetwork" content="Medium" />
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
