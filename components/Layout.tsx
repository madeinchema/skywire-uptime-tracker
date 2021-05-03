import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import { Flex } from '@chakra-ui/layout';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Skywire Uptime Tracker' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <Flex direction="column" py={[3, 5]}>
      {children}
    </Flex>
  </div>
);

export default Layout;
