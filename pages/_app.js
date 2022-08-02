// import Head from 'next/head';
import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, Global } from '@mantine/core';

import '../styles/styles.css';
import '../styles/tailwind.css';

export default function App(props) {
    const { Component, pageProps } = props;

    const [colorScheme, setColorScheme] = useState('dark');
    const toggleColorScheme = value =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            {/* <Head>
                <title>Reddit Unfurler</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head> */}

            <MantineProvider
                theme={{
                    colorScheme,
                    loader: 'dots',
                    primaryColor: 'redditOrange',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                    colors: {
                        redditOrange: [
                            '#F06A38',
                            '#F2622D',
                            '#F55B22',
                            '#F85417',
                            '#FB4C0B',
                            '#FF4500',
                            '#F44504',
                            '#E94407',
                            '#DF440A',
                            '#D5430D'
                        ]
                    }
                }}
                withGlobalStyles
                withNormalizeCS
            >
                <Global
                    styles={theme => ({
                        '*, *::before, *::after': {
                            boxSizing: 'border-box'
                        },

                        body: {
                            ...theme.fn.fontStyles(),
                            backgroundColor:
                                theme.colorScheme === 'dark'
                                    ? theme.colors.dark[9]
                                    : theme.colors.gray[2],
                            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black
                        }
                    })}
                />
                <Component {...pageProps} />
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
