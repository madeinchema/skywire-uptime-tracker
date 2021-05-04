import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Container, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { useState } from 'react';
import useVisorsUptimeList from '../hooks/useVisorsUptimeList';
import { VisorUptime } from '../interfaces';
import VisorCard from './VisorCard';

interface AddVisorInput {
  label: string;
  key: string;
}

const AddVisor = (): JSX.Element => {
  const { visorsUptimeList } = useVisorsUptimeList();
  const [inputValues, setInputValues] = useState<AddVisorInput | undefined>(
    undefined
  );
  const [visorStatusChecked, setVisorStatusChecked] = useState<
    VisorUptime | undefined
  >(undefined);

  const checkVisorStatus = (): void => {
    const visorStatus =
      inputValues?.key &&
      visorsUptimeList?.find((visor) => visor.key === inputValues.key);
    if (visorStatus) setVisorStatusChecked(visorStatus);
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
            <Text>Label</Text>
            <Input
              name="label"
              value={inputValues?.label}
              onChange={handleInputValue}
            />
          </Flex>
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
              Check visor status
            </Button>
            <Button w="100%" colorScheme="blue">
              Add visor
            </Button>
          </HStack>
          {visorStatusChecked && (
            <VisorCard
              visor={{
                key: visorStatusChecked.key,
                uptime: visorStatusChecked.uptime,
                downtime: visorStatusChecked.downtime,
                percentage: visorStatusChecked.percentage,
                online: visorStatusChecked.online,
              }}
            />
          )}
        </VStack>
      </Flex>
    </Container>
  );
};

export default AddVisor;
