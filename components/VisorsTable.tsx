import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Container,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react'
import {
  formatPercentage,
  formatSecsToDays,
} from '../utils/functions/dataFormatter'
import { VisorUptime, MyVisorUptime, VisorKey, VisorLabel } from '../interfaces'
import DeleteVisorTableCell from './modules/MyVisors/components/DeleteVisorTableCell'

type VisorFromDataSource = VisorUptime | MyVisorUptime
type DataSource = VisorUptime[] | MyVisorUptime[]

interface VisorsTableProps {
  dataSource: DataSource | undefined
  onLabelSubmit?: (key: VisorKey, label: VisorLabel) => void
}

const VisorsTable = ({
  dataSource,
  onLabelSubmit,
}: VisorsTableProps): JSX.Element => {
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
              {dataSource && areVisorsWithLabel(dataSource) && <Th>Label ▴</Th>}
              <Th>Key</Th>
              <Th isNumeric>Percentage</Th>
              <Th isNumeric>Uptime</Th>
              <Th isNumeric>Downtime</Th>
              {dataSource && areVisorsWithLabel(dataSource) && <Th />}
            </Tr>
          </Thead>
          <Tbody>
            {dataSource &&
              dataSource.map((visor: VisorFromDataSource) => {
                // TODO: Can this check be done at the dataSource level?
                const isMyVisor = (
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

                    {isMyVisor(visor) && (
                      <Td>
                        <Editable
                          fontWeight="700"
                          defaultValue={visor.label}
                          onSubmit={(value) =>
                            onLabelSubmit && onLabelSubmit(visor.key, value)
                          }
                        >
                          <EditablePreview />
                          <EditableInput />
                        </Editable>
                      </Td>
                    )}
                    <Td wordBreak="break-all" minW="320px">
                      {visor.key}
                    </Td>
                    <Td isNumeric>{formattedVisorData.percentage}</Td>
                    <Td isNumeric>{formattedVisorData.uptime}</Td>
                    <Td isNumeric>{formattedVisorData.downtime}</Td>
                    {isMyVisor(visor) && (
                      <DeleteVisorTableCell visorKey={visor.key} />
                    )}
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
