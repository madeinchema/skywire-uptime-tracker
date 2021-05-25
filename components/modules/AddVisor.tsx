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
import { Spinner } from '@chakra-ui/spinner'
import useVisor from '../../hooks/useVisor'

import VisorCard from '../common/VisorCard'
import useAddVisor from '../../hooks/useAddVisor'

function AddVisor(): JSX.Element {
  const {
    visorData,
    handlers: { checkVisorStatus, removeCheckedVisor },
  } = useVisor()
  const {
    addVisorInput,
    handlers: { handleKeyInput, submitLabel, addNewVisor, resetInput },
  } = useAddVisor()

  const handleCheckVisorStatus = (): void => {
    if (visorData?.data) {
      removeCheckedVisor()
      resetInput()
      return
    }
    checkVisorStatus(addVisorInput.visorKey)
  }

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
                value={addVisorInput?.visorKey}
                onChange={handleKeyInput}
              />
            </Flex>
            <HStack direction="column" w="100%">
              <Button
                w="100%"
                variant="outline"
                colorScheme={visorData?.data ? 'red' : 'blue'}
                onClick={handleCheckVisorStatus}
              >
                {visorData?.data ? 'Clear' : 'Check status'}
              </Button>
              <Button w="100%" colorScheme="blue" onClick={addNewVisor}>
                Add visor
              </Button>
            </HStack>
          </VStack>
          <Flex width="100%" justify="center">
            {visorData?.loading && (
              <Flex align="center" justify="center" h="86px">
                <Spinner speed="0.2s" color="blue.500" />
              </Flex>
            )}
            {visorData?.data && (
              <VisorCard
                visor={{
                  visorKey: visorData.data.visorKey,
                  uptime: visorData.data.uptime,
                  downtime: visorData.data.downtime,
                  percentage: visorData.data.percentage,
                  online: visorData.data.online,
                  label: addVisorInput.label,
                }}
                onLabelSubmit={submitLabel}
              />
            )}
          </Flex>
        </Flex>
      </Container>
    </VStack>
  )
}

export default AddVisor
