import { useColorMode } from '@chakra-ui/color-mode';
import { useClipboard } from '@chakra-ui/hooks';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import { VisorUptime } from '../interfaces';

type Props = {
  visor: VisorUptime;
};

const VisorCard = ({ visor }: Props) => {
  const toast = useToast();
  const { onCopy } = useClipboard(visor.key);
  const { colorMode } = useColorMode();

  const handleCopyVisorKey = () => {
    onCopy();
    toast({
      title: 'The public key has been copied.',
      status: 'success',
      duration: 3000,
    });
  };

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
          <Text fontWeight="700">VisorLabel</Text>
        </HStack>
        <HStack spacing={5}>
          <Tooltip hasArrow label="Uptime / Downtime">
            <Text>
              {(visor.uptime / 86400).toFixed(2)}d{' / '}
              {(visor.downtime / 86400).toFixed(2)}d
            </Text>
          </Tooltip>
          <Text>{visor.percentage.toFixed(2)}%</Text>
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
  );
};

export default VisorCard;
