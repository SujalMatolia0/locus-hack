import { Theme } from '@/config/theme';
import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';

import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import { api } from '../../utils/api';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <NextSeo
          title="Locus"
          description="A short description goes here."
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/favicon.ico',
            },
          ]}
        />
        <MantineProvider theme={Theme}>
          <Notifications />
          <Component {...pageProps} />;
        </MantineProvider>
      </SessionProvider>
    </>
  );
}

export default api.withTRPC(App);
