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
  visorKey: string
  label: string
  error: string | undefined
}

interface UseAddVisor {
  addVisorInput: AddVisorInput
  handlers: {
    addNewVisor: () => void
    submitLabel: (visorKey: VisorKey, label: string) => void
    handleKeyInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
}

/**
 * useAddVisor hook
 */
function useAddVisor(): UseAddVisor {
  const initialInputValuesState = useMemo(
    () => ({ visorKey: '', label: 'Visor', error: undefined }),
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
        const isVisorAlreadySaved = checkIsVisorAlreadySaved(
          addVisorInput.visorKey
        )
        if (isVisorAlreadySaved) {
          const error = 'This visor is already in your list.'
          setAddVisorInput(prevState => ({
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
            addNewVisor({
              visorKey: addVisorInput.visorKey,
              label: addVisorInput.label,
            })
          )
        }
      },
      submitLabel: (visorKey: VisorKey, label: string): void => {
        setAddVisorInput(prevState => ({ ...prevState, visorKey, label }))
      },
      handleKeyInput: (e: React.ChangeEvent<HTMLInputElement>): void =>
        setAddVisorInput(prevState => ({
          ...prevState,
          visorKey: e.target.value,
        })),
    }),
    [
      addVisorInput.visorKey,
      addVisorInput.label,
      checkIsVisorAlreadySaved,
      dispatch,
      toast,
    ]
  )

  return { addVisorInput, handlers }
}

export default useAddVisor
