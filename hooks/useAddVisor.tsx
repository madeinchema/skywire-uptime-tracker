import { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { VisorKey } from '../interfaces'
import { addMyVisor } from '../state/thunks/myVisors/addMyVisor'

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
    resetInput: () => void
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
          addMyVisor({
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
      resetInput: (): void => setAddVisorInput(initialInputValuesState),
    }),
    [
      addVisorInput.label,
      addVisorInput.visorKey,
      dispatch,
      initialInputValuesState,
    ]
  )

  return { addVisorInput, handlers }
}

export default useAddVisor
