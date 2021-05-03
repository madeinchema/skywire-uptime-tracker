import { Table, Thead, Tbody, Tr, Th, Td, Box } from '@chakra-ui/react';
import { VisorUptime } from '../interfaces';

type Props = {
  dataSource: VisorUptime[] | undefined;
};

const VisorsUptimeTable = ({ dataSource }: Props) => {
  return (
    <Table size="sm" variant="striped">
      <Thead>
        <Th width="80px">Online</Th>
        <Th>Key</Th>
        <Th isNumeric>Percentage</Th>
        <Th isNumeric>Uptime</Th>
        <Th isNumeric>Downtime</Th>
      </Thead>
      <Tbody>
        {dataSource &&
          dataSource.map((visor) => (
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
  );
};

export default VisorsUptimeTable;