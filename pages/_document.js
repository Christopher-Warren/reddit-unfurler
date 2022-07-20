import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    crossOrigin="*"
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,200;0,400;0,600;1,200;1,400;1,600&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body style={{ position: 'relative', zIndex: 5 }}>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
