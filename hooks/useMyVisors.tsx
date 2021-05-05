import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { MyVisorUptime, VisorUptime } from '../interfaces'
import { saveMyVisorsData } from '../state/slices/myVisorsSlice'
import { getMyVisorsList } from '../utils/functions/getVisorsList'

interface UseMyVisors {
  myVisors: VisorUptime[] | undefined
  handlers: unknown
}

const useMyVisors = (): UseMyVisors => {
  const [myVisors, setMyVisors] = useState<MyVisorUptime[] | undefined>(
    undefined
  )
  const myVisorsSelector = useSelector(
    (state: RootStateOrAny) => state.myVisors.visors
  )
  const visorsUptimeListSelector = useSelector(
    (state: RootStateOrAny) => state.visorsUptime.visors
  )
  const dispatch = useDispatch()

  /**
   * Get and save data to store when its empty
   */
  useEffect(() => {
    const shouldGetData = myVisorsSelector.length < 1
    if (shouldGetData) {
      getMyVisorsList('USE_FAKE_DATA').then((data) =>
        dispatch(saveMyVisorsData(data))
      )
    }
  }, [dispatch, myVisorsSelector.length])

  /**
   * Update myVisorsList on store changes
   */
  useEffect(() => {
    const myVisorsDataList = visorsUptimeListSelector.filter((visor) => {
      return myVisorsSelector.some((myVisor) => visor.key === myVisor.key)
    })
    setMyVisors(myVisorsDataList)
  }, [myVisorsSelector, visorsUptimeListSelector])

  /**
   * Utility functions
   */

  /**
   * Handlers
   */
  const handlers = React.useMemo(() => ({}), [])

  return { myVisors, handlers }
}

export default useMyVisors
