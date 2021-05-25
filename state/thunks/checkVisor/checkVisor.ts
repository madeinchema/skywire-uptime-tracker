import { createAsyncThunk } from '@reduxjs/toolkit'
import { VisorKey } from '../../../interfaces'
import {
  checkCanFindVisorByKey,
  getVisorUptimeByKey,
} from '../../../utils/functions/checkVisors'
import { createToast } from '../../slices/toastsSlice'
import { VisorsState } from '../../slices/visorsSlice'

export const checkVisor = createAsyncThunk(
  'checkVisor/checkVisor',
  async (visorKey: VisorKey, { getState, dispatch }) => {
    const {
      visors: { data: visorsData },
    } = (await getState()) as {
      visors: VisorsState
    }
    const visorFound = checkCanFindVisorByKey(visorsData, visorKey)
    if (!visorFound) {
      dispatch(
        createToast({
          title: `Visor not found`,
          description: visorKey,
          status: 'error',
        })
      )
      throw new Error('Visor not found')
    }

    const visorUptime = new Promise(res => {
      setTimeout(() => {
        res(getVisorUptimeByKey(visorsData, visorKey))
      }, 500)
    })

    return visorUptime
  }
)
