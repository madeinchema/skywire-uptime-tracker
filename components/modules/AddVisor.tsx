import { useCallback, useMemo, useState } from 'react'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import {
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/layout'
import useVisorData from '../../hooks/useVisorData'
import { MyVisor, VisorKey } from '../../interfaces'

import VisorCard from '../VisorCard'

const AddVisor = (): JSX.Element => {
  const {
    visorData,
    handlers: { checkVisorStatus, addNewVisor },
  } = useVisorData()
  const initialInputValuesState = useMemo(
    () => ({ key: '', label: 'Visor' }),
    []
  )
  const [inputValues, setInputValues] = useState<MyVisor>(
    initialInputValuesState
  )

  const handleKeyInput = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputValues((prevState) => ({
      ...prevState,
      key: e.target.value,
    }))

  const onLabelSubmit = (key: VisorKey, label: string): void => {
    setInputValues({ key, label })
  }

  const onClickCheckStatus = useCallback(() => {
    checkVisorStatus(inputValues.key)
    setInputValues(initialInputValuesState)
  }, [checkVisorStatus, initialInputValuesState, inputValues.key])

  const onClickAddVisor = useCallback(() => {
    addNewVisor(inputValues)
  }, [addNewVisor, inputValues])

  return (
    <VStack spacing={4} w="100%">
      <Heading as="h1" size="lg">
        Add your visors
      </Heading>

      <Container px={2} maxW="container.sm">
        <Flex direction="column">
          <VStack mb={5}>
            <Flex direction="column" w="100%">
              <Text>Public key</Text>
              <Input
                name="key"
                value={inputValues?.key}
                onChange={handleKeyInput}
              />
            </Flex>
            <HStack direction="column" w="100%">
              {visorData.data && visorData.success ? (
                <Button
                  w="100%"
                  variant="outline"
                  colorScheme={inputValues.key.length > 0 ? 'blue' : 'red'}
                  onClick={onClickCheckStatus}
                >
                  {inputValues.key.length > 0 ? 'Check other visor' : 'Reset'}
                </Button>
              ) : (
                <Button
                  w="100%"
                  variant="outline"
                  colorScheme="blue"
                  onClick={onClickCheckStatus}
                >
                  Check status
                </Button>
              )}
              <Button w="100%" colorScheme="blue" onClick={onClickAddVisor}>
                Add visor
              </Button>
            </HStack>
          </VStack>
          <Flex width="100%" justify="center">
            {visorData?.data && (
              <VisorCard
                visor={{
                  key: visorData.data.key,
                  uptime: visorData.data.uptime,
                  downtime: visorData.data.downtime,
                  percentage: visorData.data.percentage,
                  online: visorData.data.online,
                  label: inputValues.label,
                }}
                onLabelSubmit={onLabelSubmit}
              />
            )}
          </Flex>
        </Flex>
      </Container>
    </VStack>
  )
}

export default AddVisor
