import { useState, useEffect } from "react";
import styled from "styled-components";
import Head from "next/head";
import "@/styles/index.css";
import ThemeProvider from "@/theme/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [pageTitle, setPageTitle] = useState("SchulLV");
  const [metaDescription, setMetaDescription] = useState("SchulLV");

  useEffect(() => {
    //avoid duplicate mui styles (server vs. client)
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href={`/favicons/schullv/favicon.ico`} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`/favicons/schullv/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicons/schullv/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicons/schullv/favicon-16x16.png`}
        />
        <link rel="manifest" href={`/favicons/schullv/site.webmanifest`} />

        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta property="og:locale" content="de_DE" />
        <meta property="og:site_name" content="CRM" />
        <meta
          property="og:image"
          content="https://www.SchulLV.de/next-assets/next-assets/img/logo/schullv.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageProps.ogTitle ?? "SchulLV"} />
        <meta name="title" content={pageTitle} />
        <meta name="description" content={metaDescription} />
        <meta
          name="og:description"
          content={pageProps.ogDescription ?? "SchulLV"}
        />
        <meta property="og:url" content="https://www.SchulLV.de" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RootElement
            Component={Component}
            pageProps={pageProps}
            setPageTitle={setPageTitle}
            setMetaDescription={setMetaDescription}
          />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export function RootElement({
  Component,
  pageProps,
  setPageTitle,
  setMetaDescription,
}) {
  return (
    <>
      <Styled.Content>
        <Component
          {...pageProps}
          setPageTitle={(title) => setPageTitle(title)}
          setMetaDescription={(title) => setMetaDescription(title)}
        />
      </Styled.Content>
    </>
  );
}

const Styled = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    background-color: white;
    color: ${({ theme }) => theme.colors.grey2};
  `,
};
