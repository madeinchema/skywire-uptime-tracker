import { useToast } from '@chakra-ui/toast'
import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { VisorKey } from '../interfaces'
import { addNewVisor } from '../state/slices/myVisorsSlice'
import useVisor from './useVisor'

/**
 * Types
 */
interface AddVisorInput {
  key: string
  label: string
  error: string | undefined
}

interface UseAddVisor {
  addVisorInput: AddVisorInput
  handlers: {
    addNewVisor: () => void
    submitLabel: (key: VisorKey, label: string) => void
    handleKeyInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
}

/**
 * useAddVisor hook
 */
function useAddVisor(): UseAddVisor {
  const initialInputValuesState = useMemo(
    () => ({ key: '', label: 'Visor', error: undefined }),
    []
  )
  const [addVisorInput, setAddVisorInput] = useState<AddVisorInput>(
    initialInputValuesState
  )
  const {
    handlers: { checkIsVisorAlreadySaved },
  } = useVisor()
  const dispatch = useDispatch()
  const toast = useToast()

  /**
   * Handlers
   */
  const handlers = useMemo(
    () => ({
      addNewVisor: (): void => {
        const isVisorAlreadySaved = checkIsVisorAlreadySaved(addVisorInput.key)
        if (isVisorAlreadySaved) {
          const error = 'This visor is already in your list.'
          setAddVisorInput((prevState) => ({
            ...prevState,
            error,
          }))
          toast({
            title: error,
            status: 'error',
            isClosable: true,
          })
        } else {
          dispatch(
            addNewVisor({ key: addVisorInput.key, label: addVisorInput.label })
          )
        }
      },
      submitLabel: (key: VisorKey, label: string): void => {
        setAddVisorInput((prevState) => ({ ...prevState, key, label }))
      },
      handleKeyInput: (e: React.ChangeEvent<HTMLInputElement>): void =>
        setAddVisorInput((prevState) => ({
          ...prevState,
          key: e.target.value,
        })),
    }),
    [
      addVisorInput.key,
      addVisorInput.label,
      checkIsVisorAlreadySaved,
      dispatch,
      toast,
    ]
  )

  return { addVisorInput, handlers }
}

export default useAddVisor
