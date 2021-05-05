import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Flex } from '@chakra-ui/layout'
import Header from './Header'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({
  children,
  title = 'Skywire Uptime Tracker',
}: Props): JSX.Element => (
  <Flex direction="column">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
    </Head>
    <Header />
    <Flex direction="column" py={[3, 5]}>
      {children}
    </Flex>
  </Flex>
)

export default Layout
