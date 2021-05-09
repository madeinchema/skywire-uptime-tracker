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
  getHealthPercentage,
} from '../../../utils/functions/dataFormatter'
import {
  VisorUptime,
  MyVisorUptime,
  VisorKey,
  VisorLabel,
} from '../../../interfaces'
import { getSecsElapsedThisMonth } from '../../../utils/functions/getTimeRelatedData'

import DeleteVisorTableCell from '../../modules/MyVisors/components/DeleteVisorTableCell'
import VisorKeyTableCell from './components/VisorKeyTableCell'

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
  const totalSecondsElapsedThisMonth = getSecsElapsedThisMonth()

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
              <Th isNumeric>Health</Th>
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
                  health: getHealthPercentage(
                    visor.uptime,
                    totalSecondsElapsedThisMonth
                  ),
                }

                return (
                  <Tr key={visor.key} fontWeight={500}>
                    <Td>
                      <Box
                        width={3}
                        height={3}
                        borderRadius="100%"
                        bgColor={visor.online ? 'green.500' : 'red.500'}
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
                    <VisorKeyTableCell visorKey={visor.key} />
                    <Td isNumeric>{formattedVisorData.percentage}</Td>
                    <Td isNumeric>{formattedVisorData.uptime}</Td>
                    <Td isNumeric>{formattedVisorData.downtime}</Td>
                    <Td isNumeric>{formattedVisorData.health}</Td>
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
