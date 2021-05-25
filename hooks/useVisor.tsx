import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { VisorKey, VisorLabel, VisorUptime } from '../interfaces'
import { removeCheckedVisor } from '../state/slices/checkVisorSlice'
import { updateVisorLabel } from '../state/slices/myVisorsSlice'
import { checkVisor } from '../state/thunks/checkVisor/checkVisor'

/**
 * Types
 */
export interface VisorData {
  data: VisorUptime | undefined
  loading: boolean
  success: boolean
  error: string | undefined
}

interface UseVisor {
  visorData: VisorData
  handlers: {
    checkVisorStatus: (visorKey: VisorKey) => void
    updateVisorLabel: (label: VisorLabel, visorKey: VisorKey) => void
    removeCheckedVisor: () => void
  }
}

/**
 * useVisor hook
 */
function useVisor(): UseVisor {
  const [visorData, setVisorData] = useState<VisorData>({
    data: undefined,
    loading: false,
    success: false,
    error: undefined,
  })
  const checkedVisorSelector = useSelector(
    (state: RootStateOrAny) => state.checkedVisor
  )
  const dispatch = useDispatch()

  useEffect(() => {
    setVisorData(checkedVisorSelector)
  }, [checkedVisorSelector])

  /**
   * Handler functions
   */
  const handlers = React.useMemo(
    () => ({
      checkVisorStatus: (visorKey: VisorKey): void => {
        dispatch(checkVisor(visorKey))
      },
      updateVisorLabel: (label: VisorLabel, visorKey: VisorKey): void => {
        dispatch(updateVisorLabel({ visorKey, label }))
      },
      removeCheckedVisor: (): void => {
        dispatch(removeCheckedVisor())
      },
    }),
    [dispatch]
  )

  return { visorData, handlers }
}

export default useVisor
