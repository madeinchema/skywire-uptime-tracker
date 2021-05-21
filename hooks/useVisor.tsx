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
    canFindVisor: (visorKey: VisorKey) => boolean
    checkVisorStatus: (visorKey: VisorKey) => void
    checkIsVisorAlreadySaved: (visorKey: VisorKey) => boolean
    updateVisorLabel: (label: VisorLabel, visorKey: VisorKey) => void
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
      canFindVisor: (visorKey: VisorKey): boolean => {
        const visorDataFound = visorsSelector?.find(
          (visor: VisorUptime) => visor.visorKey === visorKey
        )
        return !!visorDataFound
      },
      checkVisorStatus: (visorKey: VisorKey): void => {
        dispatch(
          checkVisor({
            visorKey,
            notFoundToast: {
              title: 'Visor not found!',
              status: 'error',
              isClosable: true,
            },
          })
        )
      },
      checkIsVisorAlreadySaved: (visorKey: VisorKey) => {
        const canFindVisor = myVisorsSelector.find(
          (visor: MyVisor) => visor.visorKey === visorKey
        )
        return !!canFindVisor
      },
      updateVisorLabel: (label: VisorLabel, visorKey: VisorKey): void => {
        dispatch(updateVisorLabel({ visorKey, label }))
      },
    }),
    [dispatch, myVisorsSelector, visorsSelector]
  )

  return { visorData, handlers }
}

export default useVisor
