import { Flex, Heading, Link } from '@chakra-ui/layout';
import React from 'react';

const Header = () => {
  return (
    <Flex
      justify="space-between"
      align="center"
      h="60px"
      px={[3, 5]}
      backgroundColor={'blue.500'}
    >
      <Heading as="h1" size="md">
        Skywire Uptime Tracker
      </Heading>
      <Link
        href="https://github.com/madeinchema/skywire-uptime-tracker"
        target="_blank"
        rel="noreferrer"
      >
        Github repo
      </Link>
    </Flex>
  );
};

export default Header;
