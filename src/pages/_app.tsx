import Head from 'next/head';
import type { AppProps } from 'next/app';

import { Global } from '@emotion/react';
import globalStyles from '@/styles/globalStyles';
import theme from '@/styles/themes/main';

import AuthProvider from '@/providers/auth';
import ThemeProvider from '@/providers/theme';

import useAppLoading from '@/hooks/useAppLoading';

import Loader from '@/components/common/Loader';

const App = ({ Component, pageProps }: AppProps) => {
  const { loading } = useAppLoading();
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Helpers</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Global styles={globalStyles} />
        {loading && <Loader />}
        <Component {...pageProps} loading={loading} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
