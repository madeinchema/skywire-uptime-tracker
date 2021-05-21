import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { MyVisor, VisorKey, VisorLabel, VisorUptime } from '../interfaces'
import { checkVisor } from '../state/slices/checkVisorSlice'
import { updateVisorLabel } from '../state/slices/myVisorsSlice'

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
    canFindVisor: (key: VisorKey) => boolean
    checkVisorStatus: (key: VisorKey) => void
    checkIsVisorAlreadySaved: (key: VisorKey) => boolean
    updateVisorLabel: (label: VisorLabel, key: VisorKey) => void
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
  const visorsSelector = useSelector(
    (state: RootStateOrAny) => state.visors.data
  )
  const myVisorsSelector = useSelector(
    (state: RootStateOrAny) => state.myVisors.visors
  )
  const checkedVisorSelector = useSelector(
    (state: RootStateOrAny) => state.checkedVisor
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (checkedVisorSelector.success) {
      setVisorData(checkedVisorSelector)
    }
  }, [checkedVisorSelector])

  /**
   * Handler functions
   */
  const handlers = React.useMemo(
    () => ({
      canFindVisor: (key: VisorKey): boolean => {
        const visorDataFound = visorsSelector?.find(
          (visor: VisorUptime) => visor.key === key
        )
        return !!visorDataFound
      },
      checkVisorStatus: (key: VisorKey): void => {
        dispatch(checkVisor(key))
      },
      checkIsVisorAlreadySaved: (key: VisorKey) => {
        const canFindVisor = myVisorsSelector.find(
          (visor: MyVisor) => visor.key === key
        )
        return !!canFindVisor
      },
      updateVisorLabel: (label: VisorLabel, key: VisorKey): void => {
        dispatch(updateVisorLabel({ key, label }))
      },
    }),
    [dispatch, myVisorsSelector, visorsSelector]
  )

  return { visorData, handlers }
}

export default useVisor
