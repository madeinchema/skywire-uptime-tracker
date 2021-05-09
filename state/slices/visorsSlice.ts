import { createSlice } from '@reduxjs/toolkit'
import { VisorUptime } from '../../interfaces'

/**
 * State
 */
type VisorsState = {
  data: VisorUptime[]
  loading: boolean
  success: boolean
  error: string | undefined
}

const initialState: VisorsState = {
  data: [],
  loading: true,
  success: false,
  error: undefined,
}

/**
 * Actions' types
 */
interface SaveVisorsDataAction {
  type: string
  payload: VisorUptime[]
}

/**
 * Slice
 */
export const visorsSlice = createSlice({
  name: 'visors',
  initialState,
  reducers: {
    saveVisorsData: (state, action: SaveVisorsDataAction) => {
      state.data = action.payload
      state.success = true
    },
  },
})

export const { saveVisorsData } = visorsSlice.actions

export default visorsSlice.reducer
