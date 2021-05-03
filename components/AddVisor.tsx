import { Input } from '@chakra-ui/input';
import { Container, Flex } from '@chakra-ui/layout';
import { Dispatch, SetStateAction, useState } from 'react';
import useVisorsUptimeList from '../hooks/useVisorsUptimeList';

const AddVisor = () => {
  const { visorsUptimeList } = useVisorsUptimeList();
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  const isVisorListed = (key: string) => {
    const isVisorListed =
      visorsUptimeList?.findIndex((visor) => visor.key === key) !== -1;
    console.log({ isVisorListed });
  };
  const myVisor =
    '020011587bf42a45b15f40d6783f5e5320a69a97a7298382103b754f2e3b6b63e9';

  const isVisorOnline = (key: string) => {
    const checkIsVisorOnline =
      visorsUptimeList?.findIndex(
        (visor) => visor.key === key && visor.online === true
      ) !== -1;
    console.log({ checkIsVisorOnline });
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Container px={2} maxW="container.lg">
      <Flex direction="column">
        Visor: {myVisor}
        <button onClick={() => isVisorListed(myVisor)}>Is visor listed?</button>
        <button onClick={() => isVisorOnline(myVisor)}>Is visor Online?</button>
        <p>{inputValue}</p>
        <Input value={inputValue} onChange={handleInputValue} />
      </Flex>
    </Container>
  );
};

export default AddVisor;
