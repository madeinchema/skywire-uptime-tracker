import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Container,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { VisorUptime } from '../interfaces';
import {
  formatPercentage,
  formatSecsToDays,
} from '../utils/functions/dataFormatter';

type Props = {
  dataSource: VisorUptime[] | undefined;
};

const VisorsUptimeTable = ({ dataSource }: Props) => {
  return (
    <Container px={2} maxW="container.lg">
      <Box overflowX="auto" width="100%">
        <Table size="sm" variant="custom">
          <Thead>
            <Tr>
              <Th width="80px">Online</Th>
              <Th>Key</Th>
              <Th isNumeric>Percentage</Th>
              <Th isNumeric>Uptime</Th>
              <Th isNumeric>Downtime</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataSource &&
              dataSource.map((visor) => {
                const formattedVisorData = useMemo(
                  () => ({
                    uptime: formatSecsToDays(visor.uptime),
                    downtime: formatSecsToDays(visor.downtime),
                    percentage: formatPercentage(visor.percentage),
                  }),
                  []
                );

                return (
                  <Tr key={visor.key} fontWeight={500}>
                    <Td>
                      <Box
                        width={3}
                        height={3}
                        borderRadius="100%"
                        bgColor={visor.online ? 'green' : 'red'}
                      />
                    </Td>
                    <Td>{visor.key}</Td>
                    <Td isNumeric>{formattedVisorData.percentage}</Td>
                    <Td isNumeric>{formattedVisorData.uptime}</Td>
                    <Td isNumeric>{formattedVisorData.downtime}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};

export default VisorsUptimeTable;
