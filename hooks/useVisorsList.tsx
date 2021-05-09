import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { VisorUptime } from '../interfaces'
import { saveVisorsData } from '../state/slices/visorsSlice'
import { getVisorsList } from '../utils/functions/getVisorsList'

interface VisorsList {
  data: VisorUptime[] | undefined
  isLoading: boolean
  isHidden: boolean
  error: Error | undefined
}

interface UseVisorsList {
  visorsList: VisorsList
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
  const visorsSelector = useSelector(
    (state: RootStateOrAny) => state.visors.data
  )
  const dispatch = useDispatch()

  /**
   * Get Visors List
   */
  useEffect(() => {
    const shouldGetVisors = visorsSelector.length < 1
    if (shouldGetVisors) {
      // TODO: Remember to remove this setTimeout later
      setTimeout(() => {
        getVisorsList('USE_FAKE_DATA').then((data) =>
          dispatch(saveVisorsData(data))
        )
      }, 1000)
    }
  }, [dispatch, visorsSelector.length])

  /**
   * Set Visors List
   */
  useEffect(() => {
    const shouldSetVisors = visorsSelector.length > 0
    if (shouldSetVisors) {
      setVisorsList((prevState) => ({
        ...prevState,
        data: visorsSelector,
        isLoading: false,
      }))
    }
  }, [visorsSelector])

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

  return { visorsList, handlers }
}

export default useVisorsList
