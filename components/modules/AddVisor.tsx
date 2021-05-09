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
import useVisor from '../../hooks/useVisor'

import VisorCard from '../common/VisorCard'
import useAddVisor from '../../hooks/useAddVisor'

function AddVisor(): JSX.Element {
  const {
    visorData,
    handlers: { checkVisorStatus },
  } = useVisor()
  const {
    addVisorInput,
    handlers: { handleKeyInput, submitLabel, addNewVisor },
  } = useAddVisor()

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
                value={addVisorInput?.key}
                onChange={handleKeyInput}
              />
            </Flex>
            <HStack direction="column" w="100%">
              <Button
                w="100%"
                variant="outline"
                colorScheme="blue"
                onClick={() => checkVisorStatus(addVisorInput.key)}
              >
                Check status
              </Button>
              <Button w="100%" colorScheme="blue" onClick={addNewVisor}>
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
