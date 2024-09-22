import { Head, Html, Main, NextScript } from "next/document";

import { ibmPlexSansArabic, openSans, theme } from "@fergeh/lib/chakra-theme";

import { ColorModeScript } from "@chakra-ui/react";

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#4b83ff" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body
        className={`overflow-x-hidden bg-gray-50 dark:bg-gray-900 ${ibmPlexSansArabic.variable} ${openSans.variable}`}
      >
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;