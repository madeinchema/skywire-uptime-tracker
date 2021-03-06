import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { MyVisor, MyVisorUptime, VisorKey, VisorLabel } from '../interfaces'
import { updateVisorLabel, removeVisor } from '../state/slices/myVisorsSlice'
import { getMyVisorsUptimes } from '../utils/functions/prepareMyVisorsUptimes'
import { loadMyVisors } from '../state/thunks/myVisors/loadMyVisors'

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

  // Get and format MyVisor[] from URL Query Strings
  const getVisorsFromURL = useCallback(
    () =>
      Object.entries(visorsFromQueryString).reduce<MyVisor[]>((acc, cur) => {
        const label = cur[0]
        const visorKey = cur[1]
        // Handle: If labels are duplicated, visorKey is array of keys
        if (Array.isArray(visorKey)) {
          visorKey.forEach(key => {
            acc.push({ label, visorKey: key })
          })
          return acc
        }
        acc.push({ label, visorKey })
        return acc
      }, []),
    [visorsFromQueryString]
  )

  /* Initialize myVisors store */
  useEffect(() => {
    const visorsFromURL = getVisorsFromURL()
    if (visorsSelector.length > 0 && visorsFromURL.length > 0) {
      dispatch(loadMyVisors(visorsFromURL))
    }
  }, [visorsSelector, getVisorsFromURL, dispatch])

  /* Get prepared MyVisorUptime[] (sorted, filtered, transformed...) */
  /* Maintain myVisors state updated */
  useEffect(() => {
    getMyVisorsUptimes(myVisorsSelector, visorsSelector).then(visorsUptimes =>
      setMyVisors(prevState => ({
        ...prevState,
        data: visorsUptimes,
        isLoading: false,
      }))
    )
  }, [myVisorsSelector, visorsSelector])

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
