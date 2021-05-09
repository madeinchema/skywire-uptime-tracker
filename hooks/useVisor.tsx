import { useToast } from '@chakra-ui/toast'
import React, { useCallback, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { MyVisor, VisorKey, VisorUptime } from '../interfaces'
import { addNewVisor, updateVisorLabel } from '../state/slices/myVisorsSlice'

/**
 * Types
 */
type VisorData = {
  data: VisorUptime | undefined
  loading: boolean
  success: boolean
  error: string | undefined
}

interface UseVisor {
  visorData: VisorData
  handlers: {
    checkVisorStatus: (key: VisorKey) => void
    addNewVisor: (visor: MyVisor) => void
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
  const visorsUptimeListSelector = useSelector(
    (state: RootStateOrAny) => state.visorsUptime.visors
  )
  const myVisorsSelector = useSelector(
    (state: RootStateOrAny) => state.myVisors.visors
  )
  const dispatch = useDispatch()
  const toast = useToast()

  /**
   * Utility functions
   */
  const checkIsVisorAlreadySaved = useCallback(
    (key: VisorKey) => {
      const canFindVisor = myVisorsSelector.find(
        (visor: MyVisor) => visor.key === key
      )
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
      },
      addNewVisor: (visor: MyVisor): void => {
        const isVisorAlreadySaved = checkIsVisorAlreadySaved(visor.key)
        if (isVisorAlreadySaved) {
          const error = 'This visor is already in your list.'
          setVisorData((prevState) => ({
            data: prevState.data,
            loading: prevState.loading,
            success: prevState.success,
            error,
          }))
          toast({
            title: error,
            status: 'error',
            isClosable: true,
          })
        } else {
          dispatch(addNewVisor(visor))
        }
      },
      updateVisorLabel: (label: string, key: VisorKey): void => {
        dispatch(updateVisorLabel({ key, label }))
      },
    }),
    [checkIsVisorAlreadySaved, dispatch, toast, visorsUptimeListSelector]
  )

  return { visorData, handlers }
}

export default useVisor
