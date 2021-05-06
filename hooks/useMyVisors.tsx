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
    const visorKeysToMatch = myVisorsSelector.map(
      (myVisor: MyVisor) => myVisor.key
    )
    const visorUptimesThatMatch = visorsUptimeListSelector.filter(
      (visor: VisorUptime) => visorKeysToMatch.includes(visor.key)
    )
    const myVisorsUptimesWithLabels = visorUptimesThatMatch.map(
      (visor: VisorUptime) => {
        const myVisorToUpdate = myVisorsSelector.find(
          (myVisor: MyVisor) => myVisor.key === visor.key
        )
        return { ...visor, label: myVisorToUpdate.label }
      }
    )
    setMyVisors(myVisorsUptimesWithLabels)
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
