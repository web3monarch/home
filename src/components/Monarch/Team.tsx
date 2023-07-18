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
import { TwitterIcon, InstagramIcon, GitHubIcon, LinkedInIcon } from '../Icons/SocialIcons';

const people = [
    {
        name: 'Barney Wang',
        role: 'Founder and Chairman of Monarch',
        image: imageBarney,
        bio: 'Investor and advisor for some of the hottest emerging streetwear brands, cultural brands, and art projects. Passionate in rare collectibles and contemporary art.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Steven Cheng',
        role: 'Chief Executive Officer',
        image: imageSteven,
        bio: 'Joined and Co-founded Monarch in 2019. Introduced to entrepreneurship early, Steven has invested, founded, and led many exceptional projects. His dream is to build a portfolio of successful projects that make our world healthier.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Cayla Tsai',
        role: 'Chief Operation Officer',
        image: imageCayla,
        bio: 'Joined and Co-founded Monarch in 2022. With a background in fashion and finance, Cayla has experience building and managing teams across diverse technical disciplines. Outside of building Monarch, Cayla is a visionary with plans for bridging tastemaker economy between East and West.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Cuffsthelegend',
        role: 'Chief Basketball Officer',
        image: imageCuff,
        bio: 'Cuffsthelegend. NBA insider, Professional podcaster, and culture curator. Cuff oversees Monarch’s sports operation, from discovering exceptional talents to creating a supportive environment that inspires more.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Chris Smokes',
        role: 'Music Artist Relation',
        image: imageSmoke,
        bio: 'Chrissmokes, Entrepreneur, founder of Christopher and Co, Lifestyle Consultant at We The Best Music. Chris oversees Monarch’s hiphop development in a different way. It is a culture that expands positive influences around world and changes many lives.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    {
        name: 'Greg Lam',
        role: 'Community Manager',
        image: imageGreg,
        bio: 'A renowned art collector who is always searching for the new and the different. Greg’s first startup Image-NY stands among the leading sneaker & streetwear stores in New York. Greg’s shop and collections are living proof – each pair and each piece holds a story waiting to be shared.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
]


export default function Example() {
    return (
        <div id="team" className="py-12 lg:py-24">
            <div className="space-y-12">
                <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl dark:text-white">
                    Leadership
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
