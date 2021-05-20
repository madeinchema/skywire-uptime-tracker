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
// const checkVisor = createAsyncThunk(
//   'checkedVisor/checkVisor',
//   async (visorKey, thunkAPI) => {
//     const { data: visorsData } = thunkAPI.getState().visors
//     try {
//       const response = await visorsData.find(visor => visor.key === visorKey)
//       return response
//     } catch (err) {
//       if (!err.response) {
//         throw err
//       }
//     }
//   }
// )

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
  // extraReducers: builder => {
  //   builder.addCase(checkVisor.pending, state => {
  //     state.loading = true
  //     state.success = undefined
  //     state.error = undefined
  //   })
  //   builder.addCase(checkVisor.fulfilled, (state, action) => {
  //     state.data = action.payload
  //     state.loading = false
  //     state.success = true
  //     state.error = undefined
  //   })
  //   builder.addCase(checkVisor.rejected, (state, action) => {
  //     state.data = []
  //     state.loading = false
  //     state.success = false
  //     state.error = action.error.message
  //   })
  // },
})

// export { checkVisor }

export const { checkVisor, setCheckedVisor } = checkVisorSlice.actions

export default checkVisorSlice.reducer
