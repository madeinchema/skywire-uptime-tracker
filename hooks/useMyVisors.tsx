import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { MyVisor, MyVisorUptime, VisorKey, VisorLabel } from '../interfaces'
import {
  updateVisorLabel,
  removeVisor,
  loadMyVisors,
} from '../state/slices/myVisorsSlice'
import { getMyVisorsUptimes } from '../utils/functions/prepareMyVisorsUptimes'

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

  /* Get MyVisor[] from URL Query Strings */
  const getVisorsFromURL = useCallback(() => {
    const formattedVisors = Object.keys(visorsFromQueryString).map(
      (visorLabel: VisorLabel) => {
        const visorKey = visorsFromQueryString[visorLabel]
        return { label: visorLabel, visorKey } as MyVisor
      }
    )
    return formattedVisors
  }, [visorsFromQueryString])

  /* Get prepared MyVisorUptime[] (sorted, filtered, transformed...) */
  const preparedVisorsUptimes = useMemo(
    () => getMyVisorsUptimes(myVisorsSelector, visorsSelector),
    [myVisorsSelector, visorsSelector]
  )

  /* Initialize myVisors store */
  useEffect(() => {
    if (visorsSelector.length > 0) {
      const visorsFromURL = getVisorsFromURL()
      dispatch(loadMyVisors(visorsFromURL))
    }
  }, [visorsSelector, getVisorsFromURL, dispatch])

  /* Maintain myVisors state updated */
  useEffect(() => {
    setMyVisors(prevState => ({
      ...prevState,
      data: preparedVisorsUptimes,
      isLoading: false,
    }))
  }, [preparedVisorsUptimes])

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
