import { createSlice } from '@reduxjs/toolkit'
import { VisorUptime } from '../../interfaces'

/**
 * State
 */
type VisorsUptimeState = {
  status: 'loading' | 'success' | 'error'
  visors: VisorUptime[]
}

const initialState: VisorsUptimeState = {
  status: 'loading',
  visors: [],
}

/**
 * Actions' types
 */
interface SaveVisorsUptimeDataAction {
  type: string
  payload: VisorUptime[]
}

/**
 * Slice
 */
export const visorsUptimeSlice = createSlice({
  name: 'visorsUptime',
  initialState,
  reducers: {
    saveVisorsUptimeData: (state, action: SaveVisorsUptimeDataAction) => {
      state.visors = action.payload
      state.status = 'success'
    },
  },
})

export const { saveVisorsUptimeData } = visorsUptimeSlice.actions

export default visorsUptimeSlice.reducer
