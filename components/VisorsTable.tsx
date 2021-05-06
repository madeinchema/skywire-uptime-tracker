import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Container,
} from '@chakra-ui/react'
import {
  formatPercentage,
  formatSecsToDays,
} from '../utils/functions/dataFormatter'
import { VisorUptime, MyVisorUptime } from '../interfaces'

type VisorFromDataSource = VisorUptime | MyVisorUptime
type DataSource = VisorUptime[] | MyVisorUptime[]

interface VisorsTableProps {
  dataSource: DataSource | undefined
}

const VisorsTable = ({ dataSource }: VisorsTableProps): JSX.Element => {
  const areVisorsWithLabel = (
    dataToCheck: DataSource
  ): dataToCheck is DataSource => dataToCheck.some((visor) => 'label' in visor)

  return (
    <Container px={2} maxW="container.xl">
      <Box overflowX="auto" width="100%">
        <Table size="sm" variant="custom">
          <Thead>
            <Tr>
              <Th>Online</Th>
              {dataSource && areVisorsWithLabel(dataSource) && <Th>Label</Th>}
              <Th>Key</Th>
              <Th isNumeric>Percentage</Th>
              <Th isNumeric>Uptime</Th>
              <Th isNumeric>Downtime</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataSource &&
              dataSource.map((visor: VisorFromDataSource) => {
                // TODO: Can this check be done at the dataSource level?
                const isVisorWithLabel = (
                  visorToCheck: VisorFromDataSource
                ): visorToCheck is MyVisorUptime => 'label' in visorToCheck
                const formattedVisorData = {
                  uptime: formatSecsToDays(visor.uptime),
                  downtime: formatSecsToDays(visor.downtime),
                  percentage: formatPercentage(visor.percentage),
                }

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
                    {isVisorWithLabel(visor) && <Td>{visor.label}</Td>}
                    <Td wordBreak="break-all" minW="320px">
                      {visor.key}
                    </Td>
                    <Td isNumeric>{formattedVisorData.percentage}</Td>
                    <Td isNumeric>{formattedVisorData.uptime}</Td>
                    <Td isNumeric>{formattedVisorData.downtime}</Td>
                  </Tr>
                )
              })}
          </Tbody>
        </Table>
      </Box>
    </Container>
  )
}

export default VisorsTable
