import { useColorMode } from '@chakra-ui/color-mode'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable'
import { useClipboard } from '@chakra-ui/hooks'
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { Tooltip } from '@chakra-ui/tooltip'
import React, { useMemo } from 'react'
import { MyVisorUptime, VisorKey, VisorLabel } from '../interfaces'
import {
  formatPercentage,
  formatSecsToDays,
} from '../utils/functions/dataFormatter'

type VisorCardProps = {
  visor: MyVisorUptime
  onLabelSubmit?: (value: string, key: VisorKey) => void
}

const VisorCard = ({ visor, onLabelSubmit }: VisorCardProps): JSX.Element => {
  const toast = useToast()
  const { onCopy } = useClipboard(visor.key)
  const { colorMode } = useColorMode()

  const handleCopyVisorKey = (): void => {
    onCopy()
    toast({
      title: 'The public key has been copied.',
      status: 'success',
      duration: 3000,
    })
  }

  const formattedVisorData = useMemo(
    () => ({
      uptime: formatSecsToDays(visor.uptime),
      downtime: formatSecsToDays(visor.downtime),
      percentage: formatPercentage(visor.percentage),
    }),
    [visor.downtime, visor.percentage, visor.uptime]
  )

  const handleLabelSubmit = (newLabel: VisorLabel): void => {
    if (onLabelSubmit) onLabelSubmit(visor.key, newLabel)
  }

  return (
    <VStack
      align="flex-start"
      direction="column"
      boxShadow="md"
      py={3}
      px={4}
      borderRadius={5}
      bgColor={colorMode === 'light' ? 'white' : 'gray.900'}
    >
      <Flex justify="space-between" align="center" width="100%">
        <HStack>
          <Box
            width={3}
            height={3}
            borderRadius="100%"
            bgColor={visor.online ? 'green' : 'red'}
          />

          <Editable
            fontWeight="700"
            defaultValue={visor.label || 'Visor'}
            onSubmit={handleLabelSubmit}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </HStack>
        <HStack spacing={5}>
          <Tooltip hasArrow label="Uptime / Downtime">
            <Text>
              {formattedVisorData.uptime}
              {' / '}
              {formattedVisorData.downtime}
            </Text>
          </Tooltip>
          <Text>{formattedVisorData.percentage}</Text>
        </HStack>
      </Flex>
      <Flex wordBreak="break-all" overflowWrap="break-word" overflow="hidden">
        <Text
          fontWeight="500"
          wordBreak="break-all"
          onClick={handleCopyVisorKey}
        >
          {visor.key}
        </Text>
      </Flex>
    </VStack>
  )
}

export default VisorCard
