import { useColorMode } from '@chakra-ui/color-mode'
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/editable'
import { useClipboard } from '@chakra-ui/hooks'
import Icon from '@chakra-ui/icon'
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'
import { Tooltip } from '@chakra-ui/tooltip'
import React, { useMemo } from 'react'
import { FaHeart } from 'react-icons/fa'
import { MyVisorUptime, VisorKey, VisorLabel } from '../../interfaces'
import {
  formatPercentage,
  formatSecsToDays,
  getHealthPercentage,
} from '../../utils/functions/dataFormatter'
import { getSecsElapsedThisMonth } from '../../utils/functions/getTimeRelatedData'

type VisorCardProps = {
  visor: MyVisorUptime
  onLabelSubmit?: (value: string, visorKey: VisorKey) => void
}

const VisorCard = ({ visor, onLabelSubmit }: VisorCardProps): JSX.Element => {
  const toast = useToast()
  const { onCopy } = useClipboard(visor.visorKey)
  const { colorMode } = useColorMode()

  const totalSecondsElapsedThisMonth = getSecsElapsedThisMonth()

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
      health: getHealthPercentage(visor.uptime, totalSecondsElapsedThisMonth),
    }),
    [
      totalSecondsElapsedThisMonth,
      visor.downtime,
      visor.percentage,
      visor.uptime,
    ]
  )

  const handleLabelSubmit = (newLabel: VisorLabel): void => {
    if (onLabelSubmit) onLabelSubmit(visor.visorKey, newLabel)
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
            bgColor={visor.online ? 'green.500' : 'red.500'}
          />

          <Editable
            fontWeight="700"
            defaultValue={visor.label}
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
          <Text>
            <Icon
              aria-label="visor health icon"
              color="red.500"
              viewBox="0 0 20 20"
            >
              <FaHeart />
            </Icon>
            {formattedVisorData.health}
          </Text>
        </HStack>
      </Flex>
      <Flex wordBreak="break-all" overflowWrap="break-word" overflow="hidden">
        <Text
          fontWeight="500"
          wordBreak="break-all"
          onClick={handleCopyVisorKey}
        >
          {visor.visorKey}
        </Text>
      </Flex>
    </VStack>
  )
}

export default VisorCard
