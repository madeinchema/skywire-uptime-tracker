import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, VStack } from '@chakra-ui/react';
import Layout from '../components/Layout';
import useVisorsUptimeList from '../hooks/useVisorsUptimeList';

const IndexPage = () => {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const { visorsUptimeList } = useVisorsUptimeList();

  console.log({ visorsUptimeList });

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
    <Layout title="Users List | Next.js + TypeScript Example">
      <VStack spacing={6}>
        <h1>Visors List</h1>
        Visor: {myVisor}
        <button onClick={() => isVisorListed(myVisor)}>Is visor listed?</button>
        <button onClick={() => isVisorOnline(myVisor)}>Is visor Online?</button>
        <Table size="sm" variant="striped">
          <Thead>
            <Th width="80px">Online</Th>
            <Th>Key</Th>
            <Th isNumeric>Percentage</Th>
            <Th isNumeric>Uptime</Th>
            <Th isNumeric>Downtime</Th>
          </Thead>
          <Tbody>
            {visorsUptimeList &&
              visorsUptimeList.map((visor) => (
                <Tr key={visor.key}>
                  <Td>
                    <Box
                      width={3}
                      height={3}
                      borderRadius="100%"
                      bgColor={visor.online ? 'green' : 'red'}
                    />
                  </Td>
                  <Td>{visor.key}</Td>
                  <Td isNumeric>{visor.percentage}</Td>
                  <Td isNumeric>{visor.uptime}</Td>
                  <Td isNumeric>{visor.downtime}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </VStack>
    </Layout>
  );
};

export default IndexPage;
