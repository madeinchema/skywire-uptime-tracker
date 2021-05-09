import React, { useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { MyVisor, VisorKey, VisorLabel, VisorUptime } from '../interfaces'
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
    checkVisorStatus: (key: VisorKey) => VisorData
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
  const dispatch = useDispatch()

  /**
   * Handler functions
   */
  const handlers = React.useMemo(
    () => ({
      checkVisorStatus: (key: VisorKey): VisorData => {
        setVisorData({
          data: undefined,
          loading: true,
          success: false,
          error: undefined,
        })
        const visorDataFound = visorsSelector?.find(
          (visor: VisorUptime) => visor.key === key
        )
        if (visorDataFound)
          setVisorData({
            data: visorDataFound,
            loading: false,
            success: true,
            error: undefined,
          })
        if (!visorDataFound)
          setVisorData({
            data: undefined,
            loading: false,
            success: false,
            error: 'Could not find visor.',
          })
        return visorData
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
    [dispatch, myVisorsSelector, visorData, visorsSelector]
  )

  return { visorData, handlers }
}

export default useVisor
