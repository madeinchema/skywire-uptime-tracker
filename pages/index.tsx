import { useState } from 'react';
import { Heading, VStack } from '@chakra-ui/react';
import Layout from '../components/Layout';
import useVisorsUptimeList from '../hooks/useVisorsUptimeList';
import VisorSearch from '../components/VisorSearch';
import VisorsUptimeTable from '../components/VisorsUptimeTable';

const IndexPage = () => {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const { visorsUptimeList } = useVisorsUptimeList();

  console.log({ inputValue, setInputValue });

  const myVisor =
    '020011587bf42a45b15f40d6783f5e5320a69a97a7298382103b754f2e3b6b63e9';

  const isVisorListed = (key: string) => {
    const isVisorListed =
      visorsUptimeList?.findIndex((visor) => visor.key === key) !== -1;
    console.log({ isVisorListed });
  };

  const isVisorOnline = (key: string) => {
    const checkIsVisorOnline =
      visorsUptimeList?.findIndex(
        (visor) => visor.key === key && visor.online === true
      ) !== -1;
    console.log({ checkIsVisorOnline });
  };

  return (
    <Layout>
      <VStack spacing={6}>
        <Heading as="h1" size="lg">
          Your Visors
        </Heading>
        Visor: {myVisor}
        <button onClick={() => isVisorListed(myVisor)}>Is visor listed?</button>
        <button onClick={() => isVisorOnline(myVisor)}>Is visor Online?</button>
        <VisorSearch value={inputValue} setValue={setInputValue} />
        <p>{inputValue}</p>
        <Heading as="h1" size="lg">
          Visors List
        </Heading>
        <VisorsUptimeTable dataSource={visorsUptimeList} />
      </VStack>
    </Layout>
  );
};

export default IndexPage;
