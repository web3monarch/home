import { PaperClipIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";
import { Switch } from '@headlessui/react';
import { firestore } from "../../../firebaseClient";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function FormWhitelist() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const [agreed, setAgreed] = useState(false);
    const [collected, setCollected] = useState(false);

    const { address, isConnected } = useAccount();
    const { openConnectModal } = useConnectModal();

    const onClickSubmit = async () => {
        if (!firstName || !lastName || !email || !phoneNumber) {
            alert("Please fill out all fields");
            return;
        }

        try {
            const response = await fetch("/api/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ address, firstName, lastName, email, phoneNumber }),
            });
            const data = await response.json();

            if (response.ok) {
                setCollected(true);
            } else {
                console.error("Error: ", data.error);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    if (collected) {
        return (
            <div className="isolate py-24 sm:py-32">
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="overflow-hidden shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-base font-semibold leading-6 text-pure-200">
                                Whitelist Information Collected
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm text-pure-400">
                                Personal details and application.
                            </p>
                        </div>
                        <div className="border-t border-pure-600 px-4 py-5 sm:p-0">
                            <dl className="sm:divide-y sm:divide-pure-600">
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                    <dt className="text-sm font-medium text-pure-400">
                                        First Name
                                    </dt>
                                    <dd className="mt-1 text-sm text-pure-200 sm:col-span-2 sm:mt-0">
                                        {firstName}
                                    </dd>
                                </div>
                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                    <dt className="text-sm font-medium text-pure-400">
                                        Last Name
                                    </dt>
                                    <dd className="mt-1 text-sm text-pure-200 sm:col-span-2 sm:mt-0">
                                        {lastName}
                                    </dd>
                                </div>

                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                    <dt className="text-sm font-medium text-pure-400">
                                        ERC20 Wallet Address
                                    </dt>
                                    <dd className="mt-1 text-sm text-pure-200 sm:col-span-2 sm:mt-0">
                                        {address}
                                    </dd>
                                </div>

                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                    <dt className="text-sm font-medium text-pure-400">
                                        Email Address
                                    </dt>
                                    <dd className="mt-1 text-sm text-pure-200 sm:col-span-2 sm:mt-0">
                                        {email}
                                    </dd>
                                </div>

                                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                    <dt className="text-sm font-medium text-pure-400">
                                        Phone Number
                                    </dt>
                                    <dd className="mt-1 text-sm text-pure-200 sm:col-span-2 sm:mt-0">
                                        {phoneNumber}
                                    </dd>
                                </div>

                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        )

    }



    return (
        <div className="isolate py-24 sm:py-32">
            <div
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                aria-hidden="true"
            >
                <div
                    className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-pure-200 sm:text-4xl">
                    Whitelist Collection - Tier 1
                </h2>
                <p className="mt-2 text-lg leading-8 text-pure-400">
                    Aute magna irure deserunt veniam aliqua magna enim voluptate.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-xl sm:mt-20">
                {isConnected ? (
                    <>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-pure-300">
                                    First name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        // autoComplete="given-name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.currentTarget.value.trim())}
                                        className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-pure-300">
                                    Last name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.currentTarget.value.trim())}
                                        className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="company" className="block text-sm font-semibold leading-6 text-pure-300">
                                    ERC20 Wallet Address
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="company"
                                        id="company"
                                        autoComplete="organization"
                                        placeholder={address}
                                        readOnly
                                        className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-pure-300">
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.currentTarget.value.trim())}
                                        className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-pure-300">
                                    Phone number
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        type="text"
                                        name="phone-number"
                                        id="phone-number"
                                        autoComplete="tel"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.currentTarget.value.trim())}
                                        className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
                                <div className="flex h-6 items-center">
                                    <Switch
                                        checked={agreed}
                                        onChange={setAgreed}
                                        className={classNames(
                                            agreed ? 'bg-indigo-600' : 'bg-pure-700',
                                            'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-pure-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                        )}
                                    >
                                        <span className="sr-only">Agree to policies</span>
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                agreed ? 'translate-x-3.5' : 'translate-x-0',
                                                'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-pure-900/5 transition duration-200 ease-in-out'
                                            )}
                                        />
                                    </Switch>
                                </div>
                                <Switch.Label className="text-sm leading-6 text-pure-600">
                                    By selecting this, you agree to our{' '}
                                    <a href="#" className="font-semibold text-indigo-500">
                                        privacy&nbsp;policy
                                    </a>
                                    .
                                </Switch.Label>
                            </Switch.Group>
                        </div>
                        <div className="mt-10">
                            <button
                                type="button"
                                onClick={onClickSubmit}
                                className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
                            >
                                Submit
                            </button>
                        </div>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={openConnectModal}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 uppercase"
                    >
                        Connect Wallet
                    </button>
                )}
                {/* <Form /> */}
                {/* <form>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-pure-900"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form> */}

            </div >

        </div >
    )
}

