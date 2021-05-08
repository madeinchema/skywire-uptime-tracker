import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { VisorUptime } from '../interfaces'
import { saveVisorsUptimeData } from '../state/slices/visorsUptimeSlice'
import { getVisorsList } from '../utils/functions/getVisorsList'

interface VisorsUptimeList {
  data: VisorUptime[] | undefined
  isLoading: boolean
  isHidden: boolean
  error: Error | undefined
}

interface UseVisorsUptimeList {
  visorsUptimeList: VisorsUptimeList
  handlers: {
    handleVisorsUptimeList: () => void
  }
}

function useVisorsUptimeList(): UseVisorsUptimeList {
  const [visorsUptimeList, setVisorsUptimeList] = useState<VisorsUptimeList>({
    data: undefined,
    isLoading: true,
    isHidden: true,
    error: undefined,
  })
  const visorsUptimeListSelector = useSelector(
    (state: RootStateOrAny) => state.visorsUptime.visors
  )
  const dispatch = useDispatch()

  /**
   * Get Visors List
   */
  useEffect(() => {
    if (visorsUptimeListSelector.length < 1) {
      getVisorsList('USE_FAKE_DATA').then((data) =>
        dispatch(saveVisorsUptimeData(data))
      )
    }
  }, [dispatch, visorsUptimeListSelector.length])

  /**
   * Set Visors List
   */
  useEffect(() => {
    setVisorsUptimeList((prevState) => ({
      ...prevState,
      data: visorsUptimeListSelector,
      isLoading: false,
    }))
  }, [visorsUptimeListSelector])

  /**
   * Handlers
   */
  const handlers = React.useMemo(
    () => ({
      handleVisorsUptimeList: () => console.log('handleVisorsUptimeList'),
    }),
    []
  )

  return { visorsUptimeList, handlers }
}

export default useVisorsUptimeList
