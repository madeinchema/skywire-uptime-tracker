import { Button } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { Flex, Heading, HStack, Link } from '@chakra-ui/layout'
import React from 'react'

const Header = (): JSX.Element => {
  const { toggleColorMode } = useColorMode()

  return (
    <Flex
      justify="space-between"
      align="center"
      h="60px"
      px={[3, 5]}
      backgroundColor="blue.500"
    >
      <Heading as="h1" size="md" color="white">
        Skywire Uptime Tracker
      </Heading>
      <HStack spacing={4}>
        <Button
          size="sm"
          onClick={toggleColorMode}
          bgColor="blue.400"
          color="white"
        >
          Toggle theme
        </Button>
        <Link
          href="https://github.com/madeinchema/skywire-uptime-tracker"
          target="_blank"
          rel="noreferrer"
          color="white"
        >
          Github repo
        </Link>
      </HStack>
    </Flex>
  )
}

export default Header
