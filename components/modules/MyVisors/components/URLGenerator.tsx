import { Button } from '@chakra-ui/button'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { useState } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { Flex } from '@chakra-ui/layout'
import { useClipboard } from '@chakra-ui/hooks'
import { useToast } from '@chakra-ui/toast'
import { MyVisor } from '../../../../interfaces'
import config from '../../../../config'

const URLGenerator = (): JSX.Element => {
  const [showURL, setShowURL] = useState(false)
  const [generatedURL, setGeneratedURL] = useState<string>('')
  const myVisorsSelector: MyVisor[] = useSelector(
    (state: RootStateOrAny) => state.myVisors.visors
  )
  const { onCopy } = useClipboard(generatedURL)
  const toast = useToast()

  const handleCopyURL = (): void => {
    onCopy()
    toast({
      title: 'The URL has been copied.',
      status: 'success',
      duration: 3000,
    })
  }

  const getVisorsURL = (): string => {
    const BASE_URL = `${config.SITE_URL}/?`
    const separator = '&'
    const pairJoiner = '='
    const visorsQueryString = myVisorsSelector
      .map((visor) => visor.label + pairJoiner + visor.key)
      .join(separator)
    const URL = BASE_URL + visorsQueryString
    return URL
  }

  const handleGenerateURL = (): void => {
    setShowURL(true)
    const visorsURL = getVisorsURL()
    setGeneratedURL(visorsURL)
  }

  return (
    <Flex w="lg" justify="center">
      {showURL ? (
        <InputGroup size="md">
          <Input
            type="text"
            isReadOnly
            isFullWidth
            value={generatedURL}
            pr="4.5rem"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleCopyURL}>
              Copy
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Button colorScheme="blue" onClick={handleGenerateURL}>
          Generate link
        </Button>
      )}
    </Flex>
  )
}

export default URLGenerator
