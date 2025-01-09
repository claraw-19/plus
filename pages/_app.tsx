import { useState, useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import styled from "styled-components";
import Head from "next/head";

import "@/styles/index.css";
import { UserDataProvider, useUserData } from "@/context/userData";
import ThemeProvider from "@/theme/ThemeProvider";
import Header from "@/components/common/header/Header";
import Login from "@/components/common/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SchoolsWithDependenciesProvider } from "@/context/schoolsWithDependencies";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: {
  Component: React.ComponentType<any>;
  pageProps: any;
}) {
  const [pageTitle, setPageTitle] = useState<string>("SchulLV");
  const [metaDescription, setMetaDescription] = useState<string>("SchulLV");

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
}: {
  Component: React.ComponentType<any>;
  pageProps: any;
  setPageTitle: (title: string) => void;
  setMetaDescription: (description: string) => void;
}) {
  return (
    <>
      <Styled.Content>
        <Component
          {...pageProps}
          setPageTitle={(title: string) => setPageTitle(title)}
          setMetaDescription={(title: string) => setMetaDescription(title)}
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
