import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Container, { OuterContainer, InnerContainer } from "./Container";
import Image from "next/image";

export const CustomConnect = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                const unsupportedNetwork = chain && chain.unsupported;

                const CurrentNetwork = () => {
                    if (!connected) {
                        return (
                            <div></div>
                        )
                    }

                    if (chain.unsupported) {
                        return (
                            <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                                <button
                                    onClick={openChainModal}
                                    type="button"
                                    className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium dark:text-white text-black focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-pure-100"
                                >
                                    Wrong network
                                </button>

                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                    <ChevronDownIcon className="h-5 w-5 text-pure-300" aria-hidden="true" />
                                </div>
                            </div>

                        );
                    }

                    return (
                        <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                            <button
                                onClick={openChainModal}
                                type="button"
                                className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-pure-100"
                            >
                                {chain.name}
                            </button>

                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                <ChevronDownIcon className="h-5 w-5 text-pure-300" aria-hidden="true" />
                            </div>
                        </div>
                    );
                };


                const CurrentAccount = () => {
                    if (!connected) {
                        return (
                            <div className="flex items-center space-x-6">
                                <button type="button" onClick={openConnectModal} className="text-sm font-medium text-white hover:text-pure-100">
                                    Connect Wallet
                                </button>
                            </div>
                        )
                    }


                    return (
                        <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                            <button
                                onClick={openAccountModal}
                                type="button"
                                className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-pure-100"
                            >
                                {account.displayName}
                                {account.displayBalance ? ` (${account.displayBalance})` : ""}
                            </button>
                            
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                                <ChevronDownIcon className="h-5 w-5 text-pure-300" aria-hidden="true" />
                            </div>
                        </div>
                    );
                };


                return (
                    <header>
                        <OuterContainer>
                            {/* <div className={unsupportedNetwork ? 'bg-rose-700' : 'bg-black'}> */}
                            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                                <CurrentNetwork />
                                <CurrentAccount />
                            </div>
                            {/* </div> */}
                        </OuterContainer>
                    </header>
                );
            }}
        </ConnectButton.Custom>
    );
};


export default function Header() {
    return (
        <>
            <CustomConnect></CustomConnect>
        </>
    );
};