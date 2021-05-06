import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import {
  MyVisor,
  MyVisorUptime,
  VisorKey,
  VisorLabel,
  VisorUptime,
} from '../interfaces'
import {
  saveMyVisorsData,
  updateVisorLabel,
} from '../state/slices/myVisorsSlice'
import { getMyVisorsList } from '../utils/functions/getVisorsList'

interface UseMyVisors {
  myVisors: MyVisorUptime[] | undefined
  handlers: {
    updateVisorLabel: (key: VisorKey, label: VisorLabel) => void
  }
}

function useMyVisors(): UseMyVisors {
  const [myVisors, setMyVisors] = useState<MyVisorUptime[] | undefined>(
    undefined
  )
  const myVisorsSelector: MyVisor[] = useSelector(
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
    const visorKeysToMatch = myVisorsSelector.map(
      (myVisor: MyVisor) => myVisor.key
    )
    const matchingVisors = visorsUptimeListSelector.filter(
      (visor: VisorUptime) => visorKeysToMatch.includes(visor.key)
    )
    const myVisorsUptimesWithLabels = matchingVisors.map(
      (visor: VisorUptime) => {
        const myVisorToUpdate = myVisorsSelector.find(
          (myVisor: MyVisor) => myVisor.key === visor.key
        )
        return myVisorToUpdate && { ...visor, label: myVisorToUpdate.label }
      }
    )
    const sortedVisors = myVisorsUptimesWithLabels.sort(
      (a: MyVisorUptime, b: MyVisorUptime) =>
        a.label.localeCompare(b.label, 'en', { numeric: true })
    )

    setMyVisors(sortedVisors)
  }, [myVisorsSelector, visorsUptimeListSelector])

  /**
   * Utility functions
   */

  /**
   * Handlers
   */
  const handlers = React.useMemo(
    () => ({
      updateVisorLabel: (key: VisorKey, label: VisorLabel) => {
        dispatch(updateVisorLabel({ key, label }))
      },
    }),
    [dispatch]
  )

  return { myVisors, handlers }
}

export default useMyVisors
