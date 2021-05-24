import { createSlice } from '@reduxjs/toolkit'
import { VisorUptime } from '../../interfaces'

/**
 * State
 */
export type VisorsState = {
  data: VisorUptime[]
  loading: boolean
  success: boolean | undefined
  error: string | undefined
}

const initialState: VisorsState = {
  data: [],
  loading: false,
  success: false,
  error: undefined,
}

/**
 * Slice
 */
export const checkVisorSlice = createSlice({
  name: 'checkedVisor',
  initialState,
  reducers: {
    checkVisor() {},
    setCheckedVisor(state, { payload }) {
      return { ...state, ...payload }
    },
  },
})

export const { checkVisor, setCheckedVisor } = checkVisorSlice.actions

export default checkVisorSlice.reducer
