import { Heading, VStack } from '@chakra-ui/react';
import Layout from '../components/Layout';
import useVisorsUptimeList from '../hooks/useVisorsUptimeList';
import AddVisor from '../components/AddVisor';
import VisorsUptimeTable from '../components/VisorsUptimeTable';
import MyVisors from '../components/MyVisors';

const IndexPage = (): JSX.Element => {
  const { visorsUptimeList } = useVisorsUptimeList();

  return (
    <Layout>
      <VStack spacing={8}>
        <VStack spacing={4} w="100%">
          <Heading as="h1" size="lg">
            Add your visors
          </Heading>
          <AddVisor />
        </VStack>
        <VStack spacing={4} w="100%">
          <Heading as="h1" size="lg">
            Your Visors
          </Heading>
          <MyVisors visors={visorsUptimeList} />
        </VStack>
        <Heading as="h1" size="lg">
          Visors List
        </Heading>
        <VisorsUptimeTable dataSource={visorsUptimeList} />
      </VStack>
    </Layout>
  );
};

export default IndexPage;
