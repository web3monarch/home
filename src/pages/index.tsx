import type { NextPage } from "next";
import React from 'react';
import Head from "next/head";
import Ani from "../components/Monarch/Ani";
import Mixer from "../components/Monarch/MixerNew";
import Def from "../components/Monarch/Def";
import Team from "../components/Monarch/Team";
import Team2 from "../components/Monarch/Team2";
import Container, { OuterContainer, InnerContainer } from "../components/Layout/Container";

const Page: NextPage = () => {
    return (
        <>
            <Head>
                <title>Monarch</title>
                <meta name="description" content="Monarch" />
            </Head>

            <OuterContainer>
                <Ani />
            </OuterContainer>

            <Container className="mt-12">
                <Def />
                <Mixer />
                <Team />
                <Team2 />
                {/* <LogoCloud /> */}
                {/* <Team2 /> */}
                {/* <JoinDiscord /> */}
            </Container>
        </>
    );
};

export default Page;
