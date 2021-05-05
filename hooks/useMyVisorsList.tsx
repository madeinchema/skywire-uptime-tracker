import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { MyVisor, MyVisorUptime, VisorUptime } from '../interfaces'
import { addNewVisor, saveMyVisorsData } from '../state/slices/myVisorsSlice'
import { getMyVisorsList } from '../utils/functions/getVisorsList'

interface UseMyVisorsList {
  myVisorsList: VisorUptime[] | undefined
  handlers: {
    addNewVisor: (visor: MyVisor) => void
  }
}

const useMyVisorsList = (): UseMyVisorsList => {
  const [myVisorsList, setMyVisorsList] = useState<MyVisorUptime[] | undefined>(
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
    setMyVisorsList(myVisorsDataList)
  }, [myVisorsSelector, visorsUptimeListSelector])

  const checkVisorStatus = (): void => {
    const visorStatus = visorsUptimeListSelector?.find(
      (visor) => visor.key === inputValues.key
    )
    if (visorStatus) setVisorStatusSelected(visorStatus)
  }

  const handleLabelSubmit = (newLabel: string | undefined): void => {
    setInputValues((prevState): any => ({ ...prevState, label: newLabel }))
  }

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setInputValues((prevState): any => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))

  const handlers = React.useMemo(
    () => ({
      addNewVisor: (visor) => dispatch(addNewVisor(visor)),
    }),
    [dispatch]
  )

  return { myVisorsList, handlers }
}

export default useMyVisorsList
