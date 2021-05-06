import { Button, IconButton } from '@chakra-ui/button'
import { useColorMode } from '@chakra-ui/color-mode'
import { Text } from '@chakra-ui/layout'
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/popover'
import { Portal } from '@chakra-ui/portal'
import { Td } from '@chakra-ui/table'
import { useToast } from '@chakra-ui/toast'
import React from 'react'
import { MdClose } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { VisorKey } from '../../../../interfaces'
import { removeVisor } from '../../../../state/slices/myVisorsSlice'

interface DeleteVisorTableCellProps {
  visorKey: VisorKey
}

const DeleteVisorTableCell = ({
  visorKey,
}: DeleteVisorTableCellProps): JSX.Element => {
  const dispatch = useDispatch()
  const toast = useToast()
  const { colorMode } = useColorMode()

  const handleVisorRemoval = (): void => {
    dispatch(removeVisor({ key: visorKey }))
    toast({
      title: 'The visor has been removed.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Td>
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="Remove visor"
            size="xs"
            colorScheme="red"
            isRound
            opacity={0.5}
            _hover={{ opacity: 1 }}
            icon={
              <MdClose
                style={{
                  strokeWidth: 3,
                  stroke: colorMode === 'light' ? 'white' : '#171923',
                }}
              />
            }
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader fontWeight={700}>Remove visor</PopoverHeader>
            <PopoverCloseButton mt={1} />
            <PopoverBody>
              <Text mb={3}>
                Are you sure? You can&apos;t undo this action afterwards
              </Text>
              <Button
                colorScheme="red"
                size="sm"
                onClick={handleVisorRemoval}
                mb={1}
              >
                Remove
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </Td>
  )
}

export default DeleteVisorTableCell
