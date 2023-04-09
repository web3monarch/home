import type { NextPage } from "next";
import React from 'react';
import Head from "next/head";
import Team from "../components/Monarch/Team";
import Team2 from "../components/Monarch/Team2";
import Container, { OuterContainer, InnerContainer } from "../components/Layout/Container";

const Page: NextPage = () => {
    return (
        <>
            <Head>
                <title>Monarch Team</title>
                <meta name="description" content="Monarch Team" />
            </Head>

            <Container className="mt-12">
                <Team />
                <Team2 />
            </Container>
        </>
    );
};

export default Page;
