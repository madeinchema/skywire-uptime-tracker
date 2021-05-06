import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { VisorUptime } from '../interfaces'
import { saveVisorsUptimeData } from '../state/slices/visorsUptimeSlice'
import { getVisorsList } from '../utils/functions/getVisorsList'

interface UseVisorsUptimeList {
  visorsUptimeList: VisorUptime[] | undefined
  handlers: {
    handleVisorsUptimeList: () => void
  }
}

function useVisorsUptimeList(): UseVisorsUptimeList {
  const [visorsUptimeList, setVisorsUptimeList] = useState<
    VisorUptime[] | undefined
  >(undefined)
  const visorsUptimeListSelector = useSelector(
    (state: RootStateOrAny) => state.visorsUptime.visors
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (visorsUptimeListSelector.length < 1) {
      getVisorsList('USE_FAKE_DATA').then((data) =>
        dispatch(saveVisorsUptimeData(data))
      )
    }
  }, [dispatch, visorsUptimeListSelector.length])

  useEffect(() => {
    setVisorsUptimeList(visorsUptimeListSelector)
  }, [visorsUptimeListSelector])

  const handlers = React.useMemo(
    () => ({
      handleVisorsUptimeList: () => console.log('handleVisorsUptimeList'),
    }),
    []
  )

  return { visorsUptimeList, handlers }
}

export default useVisorsUptimeList
