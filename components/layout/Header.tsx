import { IconButton } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { Flex, Heading, HStack, Link } from '@chakra-ui/layout'
import { FaGithub, FaMoon } from 'react-icons/fa'
import { MdWbSunny } from 'react-icons/md'

const Header = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      justify="space-between"
      align="center"
      h="60px"
      px={[3, 5]}
      backgroundColor="blue.500"
    >
      <Heading as="h1" size="md" color="white" pr={3}>
        Skywire Uptime Tracker
      </Heading>

      <HStack spacing={3}>
        <IconButton
          aria-label="Toggle theme"
          fontSize={colorMode === 'light' ? 16 : 18}
          icon={colorMode === 'light' ? <FaMoon /> : <MdWbSunny />}
          size="sm"
          onClick={toggleColorMode}
          colorScheme="blue"
          bgColor="blue.400"
          color="white"
        />

        <Link
          href="https://github.com/madeinchema/skywire-uptime-tracker"
          target="_blank"
          rel="noreferrer"
          color="white"
        >
          <IconButton
            aria-label="GitHub repository"
            fontSize={18}
            icon={<FaGithub />}
            size="sm"
            onClick={toggleColorMode}
            colorScheme="blue"
            bgColor="blue.400"
            color="white"
          />
        </Link>
      </HStack>
    </Flex>
  )
}

export default Header
