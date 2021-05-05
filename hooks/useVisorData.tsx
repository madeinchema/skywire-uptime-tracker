import React, { useCallback, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { MyVisor, VisorKey, VisorUptime } from '../interfaces'
import { addNewVisor } from '../state/slices/myVisorsSlice'

type VisorData =
  | {
      data: VisorUptime | undefined
      loading: boolean
      success: boolean
      error: string | undefined
    }
  | undefined

interface UseVisorData {
  visorData: VisorData
  handlers: {
    checkVisorStatus: (key: VisorKey) => void
    handleLabelSubmit: (setter, value: string) => void
    addNewVisor: (visor: MyVisor) => void
  }
}

const useVisorData = (): UseVisorData => {
  const [visorData, setVisorData] = useState<VisorData | undefined>(undefined)
  const visorsUptimeListSelector = useSelector(
    (state: RootStateOrAny) => state.visorsUptime.visors
  )
  const myVisorsSelector = useSelector(
    (state: RootStateOrAny) => state.myVisors.visors
  )
  const dispatch = useDispatch()

  /**
   * Utility functions
   */
  const checkIsVisorAlreadySaved = useCallback(
    (key: VisorKey) => {
      const canFindVisor = myVisorsSelector.find((visor) => visor.key === key)
      return !!canFindVisor
    },
    [myVisorsSelector]
  )

  /**
   * Handler functions
   */
  const handlers = React.useMemo(
    () => ({
      checkVisorStatus: (key: VisorKey): void => {
        setVisorData({
          data: undefined,
          loading: true,
          success: false,
          error: undefined,
        })
        const visorDataFound = visorsUptimeListSelector?.find(
          (visor) => visor.key === key
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
      },
      handleLabelSubmit: (setter, value): void => {
        setter((prevState): any => ({ ...prevState, label: value }))
      },
      addNewVisor: (visor: MyVisor): void => {
        const isVisorAlreadySaved = checkIsVisorAlreadySaved(visor.key)
        if (isVisorAlreadySaved) {
          setVisorData((prevState) => ({
            ...prevState,
            error: 'This visor is already in your list.',
          }))
        } else {
          dispatch(addNewVisor(visor))
        }
      },
    }),
    [checkIsVisorAlreadySaved, dispatch, visorsUptimeListSelector]
  )

  return { visorData, handlers }
}

export default useVisorData
