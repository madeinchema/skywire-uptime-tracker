import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { VisorUptime } from '../../interfaces'
import { getVisorsList } from '../../utils/functions/getVisorsList'

/**
 * State
 */
type VisorsState = {
  data: VisorUptime[]
  loading: boolean
  success: boolean | undefined
  error: string | undefined
}

const initialState: VisorsState = {
  data: [],
  loading: true,
  success: false,
  error: undefined,
}

/**
 * Thunks
 */
const fetchVisorsData = createAsyncThunk('visors/getVisorsData', async () => {
  const response = await getVisorsList()
  return response
})

/**
 * Slice
 */
export const visorsSlice = createSlice({
  name: 'visors',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchVisorsData.pending, state => {
      state.loading = true
      state.success = undefined
      state.error = undefined
    })

    builder.addCase(fetchVisorsData.fulfilled, (state, action) => {
      state.data = action.payload
      state.loading = false
      state.success = true
      state.error = undefined
    })

    builder.addCase(fetchVisorsData.rejected, (state, action) => {
      state.data = []
      state.loading = false
      state.success = false
      state.error = action.error.message
    })
  },
})

export { fetchVisorsData }

export default visorsSlice.reducer
