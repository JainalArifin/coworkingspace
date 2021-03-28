import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from 'theme';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            <meta charSet="utf-8" />
            <link rel="shortcut icon" href="favicon.ico" />
            <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/favicons/trasa-mart.pngpng"
            />
            <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/favicons/trasa-mart.pngpng"
            />
            <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/favicons/trasa-mart.pngpng"
            />
            <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/favicons/trasa-mart.png"
            />
            <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/favicons/trasa-mart.png"
            />
            <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/favicons/trasa-mart.png"
            />
            <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/favicons/trasa-mart.png"
            />
            <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/favicons/trasa-mart.png"
            />
            <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/trasa-mart.png"
            />
            <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/favicons/trasa-mart.png"
            />
            <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/trasa-mart.png"
            />
            <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/favicons/trasa-mart.png"
            />
            <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/trasa-mart.png"
            />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta
            name="msapplication-TileImage"
            content="/favicons/trasa-mart.png"
            />
            <meta name="theme-color" content="#ffffff" />
            <meta
            name="description"
            content="A modern design system for your new landing and web pages."
            />
            <meta
            name="robots"
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta
            property="og:image"
            content="https://thefront.maccarianagency.com/social.png"
            />
            <meta
            property="og:title"
            content="Tracking (TrasaMart Coworking) Space"
            />
            <meta
            property="og:description"
            content="A modern design system for your new landing and web pages."
            />
            <meta property="og:url" content="https://thefront.maccarianagency.com/" />
            <link
            href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i&display=swap"
            rel="stylesheet"
            />
            <script
            src="https://kit.fontawesome.com/4c273e6d43.js"
            crossOrigin="anonymous"
            ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};