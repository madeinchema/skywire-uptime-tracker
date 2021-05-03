import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import React from 'react';
import { VisorUptime } from '../interfaces';

type Props = {
  visor: VisorUptime;
};

const VisorCard = ({ visor }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <VStack
      align="flex-start"
      direction="column"
      boxShadow="md"
      py={3}
      px={4}
      borderRadius={5}
      width="100%"
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
          <Text>VisorLabel</Text>
        </HStack>
        <HStack spacing={5}>
          <Text>
            {(visor.uptime / 86400).toFixed(2)}d{' / '}
            {(visor.downtime / 86400).toFixed(2)}d
          </Text>
          <Text>{visor.percentage.toFixed(2)}%</Text>
        </HStack>
      </Flex>
      <Flex
        wordBreak="break-all"
        overflowWrap="break-word"
        overflow="hidden"
        width="100%"
      >
        <Text fontWeight="500" wordBreak="break-all">
          {visor.key}
        </Text>
      </Flex>
    </VStack>
  );
};

export default VisorCard;
