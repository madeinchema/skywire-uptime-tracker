import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Container, Flex, HStack } from '@chakra-ui/layout';
import { useState } from 'react';
import useVisorsUptimeList from '../hooks/useVisorsUptimeList';

const AddVisor = (): JSX.Element => {
  const { visorsUptimeList } = useVisorsUptimeList();
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  const checkIsVisorListed = (key: string): void => {
    const isVisorListed =
      visorsUptimeList?.findIndex((visor) => visor.key === key) !== -1;
    console.log({ isVisorListed });
  };
  const myVisor =
    '020011587bf42a45b15f40d6783f5e5320a69a97a7298382103b754f2e3b6b63e9';

  const isVisorOnline = (key: string): void => {
    const checkIsVisorOnline =
      visorsUptimeList?.findIndex(
        (visor) => visor.key === key && visor.online === true
      ) !== -1;
    console.log({ checkIsVisorOnline });
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <Container px={2} maxW="container.lg">
      <Flex direction="column">
        Visor: {myVisor}
        <Button onClick={() => checkIsVisorListed(myVisor)}>
          Is visor listed?
        </Button>
        <Button onClick={() => checkIsVisorListed(myVisor)}>
          Is visor Online?
        </Button>
        <p>{inputValue}</p>
        <HStack>
          <Flex direction="column">
            Label
            <Input value={inputValue} onChange={handleInputValue} />
          </Flex>
          <Flex direction="column" width="100%">
            Public key
            <Input value={inputValue} onChange={handleInputValue} />
          </Flex>
          <Flex direction="column" align="flex-end" width="100%">
            <Button>Add visor</Button>
          </Flex>
        </HStack>
      </Flex>
    </Container>
  );
};

export default AddVisor;
