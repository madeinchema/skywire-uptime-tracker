import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveVisorsUptimeData } from '../state/slices/visorsUptimeSlice';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
} from '@chakra-ui/react';
import Layout from '../components/Layout';

type Props = {
  items: Visor[];
};

type VisorUptime = Visor & {
  key: string;
  uptime: number;
  downtime: number;
  percentage: number;
  online: boolean;
};

const IndexPage = () => {
  // const [data, setData] = useState<VisorUptime[] | undefined>(undefined);
  const visorsUptimeList = useSelector((state) => state.visorsUptime.visors);
  const dispatch = useDispatch();

  console.log({ visorsUptimeList });

  const myVisor =
    '020011587bf42a45b15f40d6783f5e5320a69a97a7298382103b754f2e3b6b63e9';
  const isVisorListed = (visorId) => {
    const isVisorListed =
      visorsUptimeList.findIndex((visor) => visor.key === visorId) !== -1;
    console.log({ isVisorListed });
  };

  const isVisorOnline = (visorId) => {
    const checkIsVisorOnline =
      visorsUptimeList.findIndex(
        (visor) => visor.key === visorId && visor.online === true
      ) !== -1;
    console.log({ checkIsVisorOnline });
  };

  useEffect(() => {
    // getVisorsUptimeData().then((data) => console.log({ data }));
    if (visorsUptimeList.length < 1) {
      console.log('here');
      // dispatch(saveVisorsUptimeData({ payload: '123' }));
      fetch('http://localhost:8080/visors', {
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log({ data });
          dispatch(saveVisorsUptimeData(data));
        });
    }
  }, []);

  return (
    <Layout title="Users List | Next.js + TypeScript Example">
      <h1>Visors List</h1>
      Visor: {myVisor}
      <br />
      <br />
      <button onClick={() => isVisorListed(myVisor)}>Is visor listed?</button>
      <button onClick={() => isVisorOnline(myVisor)}>Is visor Online?</button>
      <br />
      <br />
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
              <Tr>
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
    </Layout>
  );
};

export default IndexPage;
