import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { VisorKey } from '../interfaces'
import { addMyVisors } from '../state/slices/myVisorsSlice'

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
  const dispatch = useDispatch()

  /**
   * Handlers
   */
  const handlers = useMemo(
    () => ({
      addNewVisor: (): void => {
        dispatch(
          addMyVisors({
            visorKey: addVisorInput.visorKey,
            label: addVisorInput.label,
          })
        )
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
    [addVisorInput.label, addVisorInput.visorKey, dispatch]
  )

  return { addVisorInput, handlers }
}

export default useAddVisor
