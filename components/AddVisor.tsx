import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Container, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { useState } from 'react';
import useVisorsUptimeList from '../hooks/useVisorsUptimeList';
import { MyVisor, VisorUptime } from '../interfaces';
import VisorCard from './VisorCard';

const AddVisor = (): JSX.Element => {
  const { visorsUptimeList } = useVisorsUptimeList();
  const [inputValues, setInputValues] = useState<MyVisor | undefined>(
    undefined
  );

  const [visorStatusSelected, setVisorStatusSelected] = useState<
    VisorUptime | undefined
  >(undefined);

  const handleLabelSubmit = (newLabel: string | undefined): void => {
    setInputValues((prevState): any => ({ ...prevState, newLabel }));
  };

  const checkVisorStatus = (): void => {
    const visorStatus =
      inputValues?.key &&
      visorsUptimeList?.find((visor) => visor.key === inputValues.key);
    if (visorStatus) setVisorStatusSelected(visorStatus);
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputValues((prevState): any => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

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
              onClick={checkVisorStatus}
            >
              Check status
            </Button>
            <Button w="100%" colorScheme="blue">
              Add visor
            </Button>
          </HStack>
          {visorStatusSelected && (
            <VisorCard
              visor={{
                key: visorStatusSelected.key,
                uptime: visorStatusSelected.uptime,
                downtime: visorStatusSelected.downtime,
                percentage: visorStatusSelected.percentage,
                online: visorStatusSelected.online,
              }}
              onLabelSubmit={handleLabelSubmit}
            />
          )}
        </VStack>
      </Flex>
    </Container>
  );
};

export default AddVisor;
