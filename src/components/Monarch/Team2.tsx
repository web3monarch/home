import Image from 'next/image';
import Link from 'next/link';
import imageSample from '../../images/team/sample.jpeg';
import imageBarney from '../../images/team/barney.jpeg';
import imageSteven from '../../images/team/steven.jpeg';
import imageSmoke from '../../images/team/smoke.jpeg';
import imageCuff from '../../images/team/cuff.jpeg';
import imageCayla from '../../images/team/cayla.jpeg';
import imageTodd from '../../images/team/todd.jpeg';
import imageChristina from '../../images/team/christina.jpeg';
import imageYan from '../../images/team/yan.jpeg';
import imageJunLi from '../../images/team/junli.jpeg';
import imageGreg from '../../images/team/greg.jpeg';
import imageJason from '../../images/team/jason.jpeg';
import imageBobatea from '../../images/team/bobatea.jpeg';
import { TwitterIcon, InstagramIcon, GitHubIcon, LinkedInIcon } from '../Icons/SocialIcons';

const people = [
    // {
    //     name: 'Todd Kramer',
    //     role: 'Artist Relation',
    //     image: imageTodd,
    //     bio: 'Outside of Monarch, Todd is a reputable contemporary artist manager, ROSS + Kramer Gallery owner, NFT degen, founder of GODA, and advisor to multiple Web 3 projects. Todd is committed to inspiring more artists to explore digital as a new medium.',
    //     twitterUrl: '#',
    //     linkedinUrl: '#',
    // },
    {
        name: 'Jason H. Sun',
        role: 'Global Relation & University Events',
        image: imageJason,
        bio: 'A notable alumni from Harvard University, Jason worked in financial services industry for over a decade and was the CEO of a leading financial derivatives broker in Asia and Dubai. Being the co-founder of a New York based media company Sunshine Box, Jason has worked on some of the hit media projects in NYC Times Square. Jason catalyzed the spirit of Monarch’s first on campus project, “From Canvas to Code”, at Harvard University.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: '0xBobatea',
        role: 'Official Strategy Advisor',
        image: imageBobatea,
        bio: 'A philosopher of Web3, wielding the ontological sledgehammer to crack the epistemic nuts. Boba Epicure is previously research at Dragonfly Crypto Venture Fund and Harvard Blockchain. In the spirit of our mission, “creatives worth sharing”, Boba Epicure helps Monarch communities, individual members, and our founding team deliver Monarch-taste at its best.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Jun Li',
        role: 'Economics Advisor',
        image: imageJunLi,
        bio: 'Professor of Mathematics at Stanford University. Jun won 1st place at National Math Competition in China. (2nd won by Dr. Eugene Xu, Co-Founder of LibreMax Capital ft. in movie Big Short).',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Yanyan',
        role: 'Global Relation in Hong Kong',
        image: imageYan,
        bio: 'Passionate art collectors. Yan has a decade of experience helping Billionaires all around the world to asset allocation, including financial investment, luxury real estate financing, private jet financing, yacht financing, and arts financing.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Christina',
        role: 'Financial and Risk Officer',
        image: imageChristina,
        bio: 'Over 15 years of experience in Investment Banking and Private Equity. Christina moved to Venture Capital in 2016 and had been trusted to become CFO by many of the projects her company invested.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    // {
    //     name: 'Matt',
    //     role: 'Community builder and a dot connector',
    //     image: imageSample,
    //     bio: 'Over a decade spent in collecting rare sports cards and sneakers. Outside of Monarch, Matt is working in tech sales and always tends to stay in the know of what’s next in terms of emerging technologies and innovations.',
    //     twitterUrl: '#',
    //     linkedinUrl: '#',
    // },
]


export default function Example() {
    return (
        <div id="team" className="py-12 lg:py-24">
            <div className="space-y-12">
                <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
                    Spotlight Member
                </h2>
                <ul
                    role="list"
                    className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
                >
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
                                <div className="aspect-w-3 aspect-h-2 h-0 sm:aspect-w-3 sm:aspect-h-4">
                                    <Image className="rounded-lg object-cover shadow-lg hover:saturate-150" src={person.image} alt="" />
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="space-y-4">
                                        <div className="space-y-1 text-lg font-medium leading-6">
                                            <h3>
                                                {person.name}
                                            </h3>
                                            <p className="text-sec-500">
                                                {person.role}
                                            </p>
                                        </div>
                                        <div className="text-base">
                                            <p className="dark:text-gray-500 text-pure-700">
                                                {person.bio}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
