import { Flex, Text } from '@chakra-ui/layout';
import React from 'react';
import { VisorUptime } from '../interfaces';

type Props = {
  visor: VisorUptime;
};

const VisorCard = ({ visor }: Props) => {
  return (
    <Flex direction="column">
      <Text>{visor.key}</Text>
      <Text>{visor.online ? 'Online' : 'Offline'}</Text>
      <Text>{visor.uptime}</Text>
      <Text>{visor.downtime}</Text>
      <Text>{visor.percentage}</Text>
    </Flex>
  );
};

export default VisorCard;
