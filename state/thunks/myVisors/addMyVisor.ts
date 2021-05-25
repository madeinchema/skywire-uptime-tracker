import { createAsyncThunk } from '@reduxjs/toolkit'
import { MyVisor } from '../../../interfaces'
import { findVisorByKey } from '../../../utils/functions/checkVisors'
import { createToast } from '../../slices/toastsSlice'
import { VisorsState } from '../../slices/visorsSlice'
import { MyVisorsState } from '../../slices/myVisorsSlice'

export const addMyVisor = createAsyncThunk(
  'myVisors/addMyVisor',
  async (myVisor: MyVisor, { getState, dispatch }) => {
    const {
      visors: { data: visorsData },
      myVisors: { data: myVisorsData },
    } = (await getState()) as { visors: VisorsState; myVisors: MyVisorsState }

    const visorFound = findVisorByKey(visorsData, myVisor.visorKey)
    if (!visorFound) {
      dispatch(
        createToast({
          title: `Could not find visor: ${myVisor.label}`,
          description: myVisor.visorKey,
          status: 'error',
        })
      )
      throw new Error('Visor not found')
    }

    const isVisorAlreadySaved = findVisorByKey(myVisorsData, myVisor.visorKey)
    if (isVisorAlreadySaved) {
      dispatch(
        createToast({
          title: `This visor was already in your list: ${myVisor.label}`,
          description: myVisor.visorKey,
          status: 'info',
        })
      )
      throw new Error('Visor is already saved')
    }

    if (!visorFound || isVisorAlreadySaved) {
      throw new Error('Could not add visor')
    }
    return myVisor
  }
)
