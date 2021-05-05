import { createSlice } from '@reduxjs/toolkit'

export const visorsUptimeSlice = createSlice({
  name: 'visorsUptime',
  initialState: {
    status: 'loading',
    visors: [],
  },
  reducers: {
    saveVisorsUptimeData: (state, action) => {
      state.visors = action.payload
      state.status = 'success'
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveVisorsUptimeData } = visorsUptimeSlice.actions

export default visorsUptimeSlice.reducer
