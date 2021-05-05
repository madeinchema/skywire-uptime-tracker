import { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Container, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import useVisorData from '../hooks/useVisorData'
import { MyVisor } from '../interfaces'

import VisorCard from './VisorCard'

const AddVisor = (): JSX.Element => {
  const {
    visorData,
    handlers: { checkVisorStatus, addNewVisor },
  } = useVisorData()
  const [inputValues, setInputValues] = useState<MyVisor | undefined>(undefined)
  const toast = useToast()

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputValues((prevState): any => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  const handleLabelSubmit = (newLabel: string | undefined): void => {
    setInputValues((prevState): any => ({ ...prevState, label: newLabel }))
  }

  useEffect(() => {
    const isVisorAlreadySaved = visorData?.status === 'duplicate'
    if (isVisorAlreadySaved) {
      toast({
        title: `This visor is already in your list.`,
        status: 'error',
        isClosable: true,
      })
    }
  }, [toast, visorData?.status])

  return (
    <Container px={2} maxW="container.md">
      <Flex direction="column">
        <VStack>
          <Flex direction="column" w="100%">
            <Text>Public key</Text>
            <Input
              name="key"
              value={inputValues?.key}
              onChange={handleInputValue}
            />
          </Flex>
          <HStack direction="column" w="100%">
            <Button
              w="100%"
              variant="outline"
              colorScheme="blue"
              onClick={() => checkVisorStatus(inputValues.key)}
            >
              Check status
            </Button>
            <Button
              w="100%"
              colorScheme="blue"
              onClick={() => addNewVisor(inputValues)}
            >
              Add visor
            </Button>
          </HStack>
          {visorData?.data && (
            <VisorCard
              visor={{
                key: visorData.data.key,
                uptime: visorData.data.uptime,
                downtime: visorData.data.downtime,
                percentage: visorData.data.percentage,
                online: visorData.data.online,
              }}
              onLabelSubmit={handleLabelSubmit}
            />
          )}
        </VStack>
      </Flex>
    </Container>
  )
}

export default AddVisor
