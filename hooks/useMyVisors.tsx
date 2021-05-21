import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import {
  MyVisor,
  MyVisorUptime,
  VisorKey,
  VisorLabel,
  VisorUptime,
} from '../interfaces'
import {
  updateVisorLabel,
  removeVisor,
  addMyVisors,
} from '../state/slices/myVisorsSlice'

/**
 * Types
 */
interface MyVisors {
  data: MyVisorUptime[] | undefined
  isLoading: boolean
  error: Error | undefined
}

interface UseMyVisors {
  myVisors: MyVisors
  handlers: {
    updateVisorLabel: (visorKey: VisorKey, label: VisorLabel) => void
    removeVisor: (visorKey: VisorKey) => void
  }
}

/**
 * useMyVisors hook
 */
function useMyVisors(): UseMyVisors {
  const [myVisors, setMyVisors] = useState<MyVisors>({
    data: undefined,
    isLoading: true,
    error: undefined,
  })
  const myVisorsSelector: MyVisor[] = useSelector(
    (state: RootStateOrAny) => state.myVisors.data
  )
  const visorsSelector = useSelector(
    (state: RootStateOrAny) => state.visors.data
  )
  const { query: visorsFromQueryString } = useRouter()
  const dispatch = useDispatch()

  const getVisorsFromURL = useCallback(() => {
    const formattedVisors = Object.keys(visorsFromQueryString).map(
      (visorLabel: VisorLabel) => {
        const visorKey = visorsFromQueryString[visorLabel]
        return { label: visorLabel, visorKey } as MyVisor
      }
    )
    return formattedVisors
  }, [visorsFromQueryString])

  const getMyVisorsUptimes = useCallback((): MyVisorUptime[] => {
    const visorKeysToMatch = myVisorsSelector.map(
      (myVisor: MyVisor) => myVisor.visorKey
    )
    const matchingVisors = visorsSelector.filter((visor: VisorUptime) =>
      visorKeysToMatch.includes(visor.visorKey)
    )
    const myVisorsUptimesWithLabels = matchingVisors.map(
      (visor: VisorUptime) => {
        const myVisorToUpdate = myVisorsSelector.find(
          (myVisor: MyVisor) => myVisor.visorKey === visor.visorKey
        )
        return myVisorToUpdate && { ...visor, label: myVisorToUpdate.label }
      }
    )
    const sortedVisors = myVisorsUptimesWithLabels.sort(
      (a: MyVisorUptime, b: MyVisorUptime) =>
        a.label.localeCompare(b.label, 'en', { numeric: true })
    )
    return sortedVisors
  }, [myVisorsSelector, visorsSelector])

  /* Initialize myVisors store */
  useEffect(() => {
    if (visorsSelector.length > 0) {
      const visorsFromURL = getVisorsFromURL()
      dispatch(addMyVisors(visorsFromURL))
    }
  }, [visorsSelector, getVisorsFromURL, dispatch])

  /* Maintain myVisors state updated */
  useEffect(() => {
    const myVisorsUptimes = getMyVisorsUptimes()
    setMyVisors(prevState => ({
      ...prevState,
      data: myVisorsUptimes,
      isLoading: false,
    }))
  }, [getMyVisorsUptimes, myVisorsSelector])

  /**
   * Handlers
   */
  const handlers = React.useMemo(
    () => ({
      updateVisorLabel: (visorKey: VisorKey, label: VisorLabel) => {
        dispatch(updateVisorLabel({ visorKey, label }))
      },
      removeVisor: (visorKey: VisorKey) => {
        dispatch(removeVisor({ visorKey }))
      },
    }),
    [dispatch]
  )

  return { myVisors, handlers }
}

export default useMyVisors
