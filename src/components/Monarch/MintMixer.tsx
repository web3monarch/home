import Link from 'next/link';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import Image from 'next/image';
import { ethers } from 'ethers';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import {
    useAccount,
    usePrepareContractWrite,
    useContractWrite,
    useWaitForTransaction,
} from "wagmi";
import CONTRACT_ABI from '../../config/abi/monarchMixer';

// import TokenImage0 from '../../images/tokens/0.svg';
import TokenImage1 from '../../images/tokens/1.jpg';
import TokenImage2 from '../../images/tokens/2.jpg';
// import TokenImage2 from '../../images/tokens/2.svg';
import social from '../../config/constants/social';


type TokenMeta = {
    imageSrc: any,
    name: string,
}

const TOKEN_METAS = [
    // {
    //     imageSrc: TokenImage0,
    //     imageAlt: 'Default Image',
    // },
    {
        imageSrc: TokenImage1,
        name: 'From Canvas to Code',
    },
    {
        imageSrc: TokenImage2,
        name: 'SKYTOP',
    },
    // {
    //     imageSrc: TokenImage2,
    //     imageAlt: 'Token #2 Image',
    // },
]

const MONARCH_MIXER_CONTRACT_CONFIG = {
    // address: '0x3Ce56CDA2ad1d2E2E15a9e3A3Cdff7986E505a55',
    address: '0xCFB211ff3FbC00729DE3FDCd1D105d58B5E98d6D',
    abi: CONTRACT_ABI,
};

interface MintCodeJSON {
    tokenId: number,
    sigId: number,
    sig: `0x${string}`,
}

function isMintCodeJSON(obj: any): obj is MintCodeJSON {
    console.log('isMintCodeJSON');
    console.log(obj);

    if (typeof obj.tokenId !== 'number') return false;
    if (typeof obj.sigId !== 'number') return false;
    if (!ethers.utils.isHexString(obj.sig)) return false;
    return true;
}


enum TipType {
    Info,
    Error,
    Success,
}

type Tip = {
    type: TipType,
    message: string,
}

const DEFAULT_TIP = {
    type: TipType.Info,
    message: 'Enter a valid Mint-Code then claim Monarch-Mixer...'
} as Tip;


function Example() {
    const { address, isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();

    // `mintCode`
    const [mintCode, setMintCode] = useState<string>('');
    const [mintCodeError, setMintCodeError] = useState<string>();
    const [mintCodeJSON, setMintCodeJSON] = useState<MintCodeJSON>();
    useEffect(() => {
        writeMint.reset();
        if (mintCode) {
            try {
                const strJson = new TextDecoder().decode(ethers.utils.base58.decode(mintCode));
                const json = JSON.parse(strJson);
                console.log(`json: ${json.sigId}`);

                if (!isMintCodeJSON(json)) {
                    setMintCodeJSON(undefined);
                    setMintCodeError('MintCode: invalid');
                    return;
                }

                setMintCodeJSON(JSON.parse(strJson));
                setMintCodeError(undefined);

                console.log(json);
            } catch (e) {
                setMintCodeJSON(undefined);
                setMintCodeError('MintCode: invalid');
            }

            return;
        }

        setMintCodeJSON(undefined);
        setMintCodeError(undefined);
    }, [mintCode]);

    // prepare and `mint`
    const debouncedMintCodeJSON = useDebounce(mintCodeJSON, 1000);
    const prepareMint = usePrepareContractWrite({
        ...MONARCH_MIXER_CONTRACT_CONFIG,
        functionName: 'mint',
        args: debouncedMintCodeJSON ? [
            ethers.BigNumber.from(debouncedMintCodeJSON.tokenId),
            ethers.BigNumber.from(debouncedMintCodeJSON.sigId),
            debouncedMintCodeJSON.sig,
        ] : undefined,
        cacheTime: 13_000,
        enabled: Boolean(debouncedMintCodeJSON) && !mintCodeError,
    });
    const writeMint = useContractWrite(prepareMint?.data);
    const waitForMintTx = useWaitForTransaction({
        hash: writeMint?.data?.hash,
        confirmations: 1,
        enabled: Boolean(writeMint?.data),
        timeout: 600_000,
        onSuccess(data) {
            console.warn('Success', data)
        },
        onError(error) {
            console.warn('Error', error)
        },
    });

    // onClick `mint`
    const onClickMint = async () => {
        if (writeMint?.write) {
            writeMint.write();
        }
    }

    // `mintCodeErrorMessage`
    const [mintCodeErrorMessage, setMintCodeErrorMessage] = useState<string>();
    useEffect(() => {
        if (!mintCode) {
            setMintCodeErrorMessage(undefined);
            return;
        }

        if (mintCodeError) {
            setMintCodeErrorMessage(mintCodeError);
            return;
        }

        if (prepareMint?.error) {
            if (prepareMint.error.hasOwnProperty('reason')) {
                setMintCodeErrorMessage(prepareMint.error['reason']);
            } else {
                setMintCodeErrorMessage(prepareMint.error.message);
            }
            return;
        }

        setMintCodeErrorMessage(undefined);
    }, [mintCode, mintCodeError, prepareMint]);


    const [tokenMeta, setTokenMeta] = useState<TokenMeta>(TOKEN_METAS[0]);
    useEffect(() => {
        if (
            mintCodeJSON
            &&
            0 < mintCodeJSON.tokenId
            &&
            TOKEN_METAS.length >= mintCodeJSON.tokenId
        ) {
            setTokenMeta(TOKEN_METAS[mintCodeJSON.tokenId - 1]);
            return;
        }

        setTokenMeta(TOKEN_METAS[TOKEN_METAS.length - 1]);
    }, [mintCodeJSON]);




    const Button = () => {
        if (!isConnected) {
            return (
                <button
                    type="button"
                    onClick={openConnectModal}
                    className="block w-full rounded-md bg-sec-500 py-3 px-4 font-medium text-base text-white shadow hover:bg-sec-600 focus:outline-none focus:ring-2 focus:ring-sec-300 focus:ring-offset-2 focus:ring-offset-pure-900"
                >
                    Connect Wallet
                </button>
            )
        }

        return (
            <button
                type="button"
                disabled={!writeMint.write || writeMint.isLoading || waitForMintTx?.isLoading}
                onClick={onClickMint}
                className="block w-full rounded-md bg-sec-500 py-3 px-4 font-medium text-base text-white shadow hover:bg-sec-600 focus:outline-none focus:ring-2 focus:ring-sec-300 focus:ring-offset-2 focus:ring-offset-pure-900"
            >
                Claim Now
            </button>
        )
    }




    function getTip(): Tip {
        // console.log('getTip');

        if (!isConnected) {
            return {
                type: TipType.Info,
                message: 'Please connect wallet first...',
            };
        }

        if (waitForMintTx?.isSuccess) {
            return {
                type: TipType.Success,
                message: 'Claimed Successfully.',
            };
        }

        if (waitForMintTx?.isLoading) {
            return {
                type: TipType.Info,
                message: 'Claim transaction is pending...',
            };
        }

        if (writeMint?.isLoading) {
            return {
                type: TipType.Info,
                message: 'Waiting for authorization...',
            };
        }

        if (waitForMintTx?.error) {
            return {
                type: TipType.Error,
                message: (waitForMintTx.error.hasOwnProperty('reason')) ?
                    waitForMintTx.error['reason'] : waitForMintTx.error.message,
            };
        }

        if (writeMint?.error) {
            return {
                type: TipType.Error,
                message: (writeMint.error.hasOwnProperty('reason')) ?
                    writeMint.error['reason'] : writeMint.error.message,
            };
        }

        if (prepareMint?.isLoading) {
            return {
                type: TipType.Info,
                message: 'Querying...',
            };
        }

        if (prepareMint?.error) {
            return {
                type: TipType.Error,
                message: (prepareMint.error.hasOwnProperty('reason')) ?
                    prepareMint.error['reason'] : prepareMint.error.message,
            };
        }

        if (mintCodeError) {
            return {
                type: TipType.Error,
                message: mintCodeError
            };
        }

        if (!mintCode) {
            return {
                type: TipType.Info,
                message: 'Please enter Mint-Code then claim your Monarch-Mixer...',
            };
        }

        if (mintCodeJSON) {
            return {
                type: TipType.Info,
                message: `You can claim MonarchMixer: ${tokenMeta.name}`,
            };
        }

        return DEFAULT_TIP;
    }

    const Tip = () => {
        const tip = getTip();

        if (tip.type === TipType.Error) {
            return (
                <p className="mt-3 text-sm dark:text-rose-300 text-rose-500 sm:mt-4">
                    {tip.message}
                </p>
            )
        }

        if (tip.type === TipType.Success) {
            return (
                <p className="mt-3 text-sm text-green-300 sm:mt-4">
                    {tip.message}
                </p>
            )
        }

        return (
            <p className="mt-3 text-sm dark:text-pure-300 text-pure-600 sm:mt-4">
                {tip.message}
            </p>
        )
    }








    return (
        <div id="mint-mixer" className="relative overflow-hidden">
            <div className="hidden sm:absolute sm:inset-0 sm:block" aria-hidden="true">
                <svg
                    className="absolute bottom-0 right-0 mb-48 translate-x-1/2 transform text-pure-700/30 lg:top-0 lg:mt-28 lg:mb-0 xl:translate-x-0 xl:transform-none"
                    width={364}
                    height={384}
                    viewBox="0 0 364 384"
                    fill="none"
                >
                    <defs>
                        <pattern
                            id="eab71dd9-9d7a-47bd-8044-256344ee00d0"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                        >
                            <rect x={0} y={0} width={4} height={4} fill="currentColor" />
                        </pattern>
                    </defs>
                    <rect width={364} height={384} fill="url(#eab71dd9-9d7a-47bd-8044-256344ee00d0)" />
                </svg>
            </div>
            <div className="relative pt-6 py-12 lg:py-24">
                <main className="mt-16 sm:mt-24">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                            <div>
                                <Link
                                    target="_blank"
                                    href={social.openSeaMixer}
                                    className="inline-flex items-center rounded-full bg-black p-1 pr-2 text-white hover:text-pure-200 sm:text-base lg:text-sm xl:text-base"
                                >
                                    <span className="rounded-full bg-sec-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                                        Explore
                                    </span>
                                    <span className="ml-4 text-sm">
                                        on OpenSEA
                                    </span>
                                    <ChevronRightIcon className="ml-2 h-5 w-5 text-pure-500" aria-hidden="true" />
                                </Link>
                                <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl dark:text-pure-100 text-black">
                                    <span className="block">
                                        Claim Monarch Mixer
                                    </span>
                                    <span className="block text-sec-400">
                                        Join our Journey
                                    </span>
                                </h1>
                                <p className="mt-6 text-base text-pure-700 dark:text-pure-400">
                                    Monarch Mixer are NFT mementos,
                                    minted in recognition for our early supporters.
                                    The word “Mixer” describes our journey and mission –
                                    bring different names to collaborate something
                                    you wouldn’t expect and skyrocket the experience.
                                    We will continuously facilitate activities and
                                    bridging the right people in the right place to thrive.
                                    There will be a limited amount of Monarch Mixers
                                    given out during these activities. Stay tuned!
                                </p>
                                <div className="mt-8">
                                    <div className="sm:px-1 sm:mx-auto sm:max-w-xl lg:mx-0">
                                        <div className="sm:flex">
                                            <div className="min-w-0 flex-1">
                                                <label htmlFor="mint-code" className="sr-only">
                                                    Mint-Code
                                                </label>
                                                <input
                                                    id="mint-code"
                                                    type="mint-code"
                                                    onChange={(e) => setMintCode(e.currentTarget.value.trim())}
                                                    placeholder="Enter your Mint-Code"
                                                    className="block w-full rounded-md border-0 dark:bg-[#3B3B3B] bg-pure-200  px-4 py-3 dark:disabled:bg-pure-300 text-base dark:text-pure-200 text-pure-700 placeholder-pure-400 focus:outline-none focus:ring-2 focus:ring-sec-300 focus:ring-offset-2 focus:ring-offset-pure-900 disabled:placeholder-pure-600"
                                                    disabled={!isConnected}
                                                />
                                            </div>
                                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                                <Button />
                                            </div>
                                        </div>
                                            <Tip />                         
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0">
                            <div className="sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden">
                                {/* ... sm:rounded-lg */}
                                <Image
                                    className="rounded-xl"
                                    src={tokenMeta.imageSrc}
                                    alt={tokenMeta.name}
                                    priority={true}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Example;