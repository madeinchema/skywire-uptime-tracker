import { Td } from '@chakra-ui/table'
import { VisorKey } from '../../../../interfaces'

interface VisorKeyTableCellProps {
  visorKey: VisorKey
}

const VisorKeyTableCell = ({
  visorKey,
}: VisorKeyTableCellProps): JSX.Element => {
  return (
    <Td wordBreak="break-all" minW="320px">
      {visorKey}
    </Td>
  )
}

export default VisorKeyTableCell
