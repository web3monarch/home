import React from 'react';
import Link from 'next/link';
import Container, { OuterContainer, InnerContainer } from './Container'
import { Logo } from '../Monarch/LogoNew';
import { TwitterIcon, InstagramIcon, GitHubIcon, LinkedInIcon } from '../Icons/SocialIcons';
import clsx from 'clsx';
import social from '../../config/constants/social';
import ThemeToggle from './ThemeToggle';

interface SocialLinkProps {
    href: string;
    ariaLabel: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, ariaLabel, icon: Icon }) => {
    return (
        <Link className="group -m-1 p-1" href={href} aria-label={ariaLabel}>
            <Icon className={clsx(
                'transition backdrop-blur',
                'h-6 w-6 fill-pure-600 group-hover:fill-pri-400',
            )} />
        </Link>
    );
}

export function Footer() {
    return (
        <footer className="mt-32">
            <OuterContainer>
                <div className="py-16">
                    <InnerContainer>
                        <div>
                       
                            <Logo className={clsx(
                                'pointer-events-auto',
                                'transition ease-in-out duration-500 backdrop-blur',
                                'mx-auto h-auto w-12 md:w-16',
                                // 'shadow-lg shadow-pure-800/5',
                                'text-pure-600 dark:hover:text-white hover:text-black',
                            )} />
                        </div>
                        
                        <div className="mt-10 text-sm" aria-label="quick links">
                            <div className="-my-1 flex justify-center gap-x-6">

                                {[
                                    {
                                        target: "",
                                        href: "/",
                                        title: "Home"
                                    },
                                    {
                                        target: "",
                                        href: "/about",
                                        title: "About"
                                    },
                                    {
                                        target: "",
                                        href: "/mixer",
                                        title: "Monarch Mixer"
                                    },
                                    // {
                                    //     target: "_blank",
                                    //     href: "https://github.com/web3jt",
                                    //     title: "GitHub"
                                    // },
                                ].map((link, key) => (
                                    <Link
                                        key={key}
                                        target={link.target}
                                        href={link.href}
                                        className={clsx(
                                            'transition rounded-lg py-1 px-3',
                                            'hover:bg-pure-800',
                                            'text-pure-700 hover:text-pri-400',
                                        )}
                                    >
                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </InnerContainer>
                </div>

                <div className="border-t border-pure-100 pt-10 pb-16 dark:border-pure-700/40">
                    <InnerContainer>
                        <div className={clsx(
                            'flex flex-col items-center sm:flex-row-reverse sm:justify-between',
                            'gap-6 sm:flex-row',
                        )}>
                            <ThemeToggle />
                            <div className="flex gap-x-6">
                                {[
                                    {
                                        href: social.twitter,
                                        ariaLabel: "Follow on Twitter",
                                        icon: TwitterIcon,
                                    },
                                    {
                                        href: social.instagram,
                                        ariaLabel: "Follow on Instagram",
                                        icon: InstagramIcon,

                                    },
                                    {
                                        href: social.github,
                                        ariaLabel: "Follow on GitHub",
                                        icon: GitHubIcon,
                                    },
                                    // {
                                    //     href: social.linkedin,
                                    //     ariaLabel: "Follow on LinkedIn",
                                    //     icon: LinkedInIcon,
                                    // },
                                ].map((link, key) => (
                                    <SocialLink key={key} href={link.href} ariaLabel={link.ariaLabel} icon={link.icon} />
                                ))}
                               
                            </div>

                            <p className="pointer-events-none select-none text-sm text-pure-600">
                                &copy; 2020 - {new Date().getFullYear()} Monarch Group. All rights reserved.
                            </p>
                        </div>
                    </InnerContainer>
                </div>
            </OuterContainer>
        </footer>
    )
}
