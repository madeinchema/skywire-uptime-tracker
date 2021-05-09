import { useClipboard } from '@chakra-ui/hooks'
import { Td } from '@chakra-ui/table'
import { useToast } from '@chakra-ui/toast'
import { VisorKey } from '../../../../interfaces'

interface VisorKeyTableCellProps {
  visorKey: VisorKey
}

const VisorKeyTableCell = ({
  visorKey,
}: VisorKeyTableCellProps): JSX.Element => {
  const toast = useToast()
  const { onCopy } = useClipboard(visorKey)

  const handleCopyVisorKey = (): void => {
    onCopy()
    toast({
      title: 'The public key has been copied.',
      status: 'success',
      duration: 3000,
    })
  }
  return (
    <Td wordBreak="break-all" minW="320px" onClick={handleCopyVisorKey}>
      {visorKey}
    </Td>
  )
}

export default VisorKeyTableCell
