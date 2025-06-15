import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl" className="scroll-smooth">
      <Head>
        <link rel="icon" type="image/png" href="/images/logos/logo1.png" />
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <body className="antialiase ">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
