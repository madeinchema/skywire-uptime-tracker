import { createAsyncThunk } from '@reduxjs/toolkit'
import { MyVisor, VisorUptime } from '../../../interfaces'
import { findVisorByKey } from '../../../utils/functions/checkVisors'
import { createToast } from '../../slices/toastsSlice'

export const addMyVisor = createAsyncThunk(
  'myVisors/addMyVisor',
  async (myVisor: MyVisor, { getState, dispatch }) => {
    const state = await getState()
    const visorsData = await state.visors.data
    const myVisorsData = await state.myVisors.data

    const visorFound: VisorUptime | boolean = await findVisorByKey(
      visorsData,
      myVisor.visorKey
    ).then(res => {
      if (!res) {
        dispatch(
          createToast({
            title: `Could not find visor: ${myVisor.label}`,
            description: myVisor.visorKey,
            status: 'error',
          })
        )
      }
      return res
    })

    return findVisorByKey(myVisorsData, visorFound.visorKey).then(res => {
      if (visorFound && !res) return myVisor

      dispatch(
        createToast({
          title: `This visor was already in your list: ${myVisor.label}`,
          description: myVisor.visorKey,
          status: 'info',
        })
      )
    })
  }
)
