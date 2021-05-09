import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { VisorUptime } from '../interfaces'
import { saveVisorsUptimeData } from '../state/slices/visorsUptimeSlice'
import { getVisorsList } from '../utils/functions/getVisorsList'

interface VisorsList {
  data: VisorUptime[] | undefined
  isLoading: boolean
  isHidden: boolean
  error: Error | undefined
}

interface UseVisorsList {
  visorsUptimeList: VisorsList
  handlers: {
    toggleShowVisorsList: () => void
  }
}

function useVisorsList(): UseVisorsList {
  const [visorsList, setVisorsList] = useState<VisorsList>({
    data: undefined,
    isLoading: true,
    isHidden: true,
    error: undefined,
  })
  const visorsUptimesSelector = useSelector(
    (state: RootStateOrAny) => state.visorsUptime.visors
  )
  const dispatch = useDispatch()

  /**
   * Get Visors List
   */
  useEffect(() => {
    const shouldGetVisors = visorsUptimesSelector.length < 1
    if (shouldGetVisors) {
      // TODO: Remember to remove this setTimeout later
      setTimeout(() => {
        getVisorsList('USE_FAKE_DATA').then((data) =>
          dispatch(saveVisorsUptimeData(data))
        )
      }, 1000)
    }
  }, [dispatch, visorsUptimesSelector.length])

  /**
   * Set Visors List
   */
  useEffect(() => {
    const shouldSetVisors = visorsUptimesSelector.length > 0
    if (shouldSetVisors) {
      setVisorsList((prevState) => ({
        ...prevState,
        data: visorsUptimesSelector,
        isLoading: false,
      }))
    }
  }, [visorsUptimesSelector])

  /**
   * Handlers
   */
  const handlers = React.useMemo(
    () => ({
      toggleShowVisorsList: () =>
        setVisorsList((prevState) => ({
          ...prevState,
          isHidden: !prevState.isHidden,
        })),
    }),
    []
  )

  return { visorsUptimeList: visorsList, handlers }
}

export default useVisorsList
