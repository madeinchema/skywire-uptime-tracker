import React, { useEffect, useState } from 'react'
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
  saveMyVisorsData,
  updateVisorLabel,
  removeVisor,
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
    (state: RootStateOrAny) => state.myVisors.visors
  )
  const visorsSelector = useSelector(
    (state: RootStateOrAny) => state.visors.data
  )
  const dispatch = useDispatch()

  const { query: visorsFromURL } = useRouter()
  const existVisorsFromURL = Object.keys(visorsFromURL).length > 0

  /**
   * Check and/or get visors from URL
   */
  useEffect(() => {
    if (existVisorsFromURL) {
      const formatVisorsFromURL = (): unknown[] => {
        const formattedVisors = Object.keys(visorsFromURL).map(
          (visorLabel: VisorLabel) => {
            const key = visorsFromURL[visorLabel]
            return { label: visorLabel, key }
          }
        )
        return formattedVisors
      }
      const formattedVisorsFromURL = formatVisorsFromURL()
      dispatch(saveMyVisorsData(formattedVisorsFromURL))
    }
  }, [dispatch, existVisorsFromURL, visorsFromURL])

  /**
   * Get and save data to store when its empty
   */
  // useEffect(() => {
  //   const shouldGetData = myVisorsSelector.length < 1
  //   if (shouldGetData) {
  //     getMyVisorsList('USE_FAKE_DATA').then((data) =>
  //       dispatch(saveMyVisorsData(data))
  //     )
  //   }
  // }, [dispatch, myVisorsSelector.length])

  /**
   * Update myVisorsList on store changes
   */
  useEffect(() => {
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

    setMyVisors((prevState) => ({
      ...prevState,
      data: sortedVisors,
    }))
  }, [myVisorsSelector, visorsSelector])

  /**
   * Handle loading based off VisorsUptimeList
   */
  useEffect(() => {
    const isVisorsUptimeListLoaded = visorsSelector.length > 0
    if (isVisorsUptimeListLoaded) {
      setMyVisors((prevState) => ({
        ...prevState,
        isLoading: false,
      }))
    }
  }, [visorsSelector.length])

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
