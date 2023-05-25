import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

// dark theme mgr
import { Provider as AtomProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';

// wagmi
import { WagmiConfig } from "wagmi";
import { chain } from 'wagmi';
import { chains, wagmiClient } from "config/wagmi";

// RainbowKit
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css';

//
import "../styles/globals.css";
import Layout from '../components/Layout';

import store from '../store/store';


function DApp({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <AtomProvider store={store}>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <WagmiConfig client={wagmiClient}>
                    <RainbowKitProvider
                        theme={darkTheme()}
                        chains={chains}
                        initialChain={chain.mainnet}
                        // showRecentTransactions={true}
                        appInfo={{
                            // TODO
                            appName: 'Monarch',
                            learnMoreUrl: 'https://monarch.one',
                        }}
                    >
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </RainbowKitProvider>
                </WagmiConfig>
            </ThemeProvider>
        </AtomProvider>
    );
}

export default DApp;
