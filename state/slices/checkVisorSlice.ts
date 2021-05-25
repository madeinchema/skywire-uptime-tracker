import { createSlice } from '@reduxjs/toolkit'
import { VisorUptime } from '../../interfaces'
import { checkVisor } from '../thunks/checkVisor/checkVisor'

/**
 * State
 */
export type CheckedVisorState = {
  data: VisorUptime | undefined
  loading: boolean
  error: string | undefined
}

const initialState: CheckedVisorState = {
  data: undefined,
  loading: false,
  error: undefined,
}

/**
 * Slice
 */
export const checkVisorSlice = createSlice({
  name: 'checkedVisor',
  initialState,
  reducers: {
    removeCheckedVisor: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(checkVisor.pending, state => {
      state.data = undefined
      state.loading = true
      state.error = undefined
    })

    builder.addCase(checkVisor.fulfilled, (state, action) => {
      state.data = action.payload as VisorUptime
      state.loading = false
      state.error = undefined
    })

    builder.addCase(checkVisor.rejected, (state, action) => {
      state.data = undefined
      state.loading = false
      state.error = action.error.message
    })
  },
})

export const { removeCheckedVisor } = checkVisorSlice.actions

export default checkVisorSlice.reducer
