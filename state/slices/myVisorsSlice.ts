import { createSlice } from '@reduxjs/toolkit'
import { VisorKey, MyVisor, VisorLabel } from '../../interfaces/index'

import { loadMyVisors } from '../thunks/myVisors/loadMyVisors'
import { addMyVisor } from '../thunks/myVisors/addMyVisor'

/**
 * State
 */
type MyVisorsState = {
  data: MyVisor[]
  loading: boolean
  success: boolean | undefined
  error: string | undefined
}

const initialState: MyVisorsState | [] = {
  data: [],
  loading: false,
  success: false,
  error: undefined,
}

/**
 * Actions' types
 */
interface UpdateVisorAction {
  type: string
  payload: {
    visorKey: VisorKey
    label: VisorLabel
  }
}

/**
 * Slice
 */
export const myVisorsSlice = createSlice({
  name: 'myVisors',
  initialState,
  reducers: {
    updateVisorLabel: (
      state,
      { payload: { visorKey, label } }: UpdateVisorAction
    ) => {
      const canFindVisorToUpdate = state.data.find(
        visor => visor.visorKey === visorKey
      )
      if (canFindVisorToUpdate) {
        const updatedVisor = { label, visorKey }
        const updatedVisorsList = state.data.map(visor =>
          visor.visorKey === visorKey ? updatedVisor : visor
        )
        state.data = updatedVisorsList
      }
    },
    removeVisor: (state, { payload: { visorKey } }) => {
      state.data = state.data.filter(visor => visor.visorKey !== visorKey)
    },
  },
  extraReducers: builder => {
    builder.addCase(addMyVisor.pending, state => {
      state.loading = true
      state.success = undefined
      state.error = undefined
    })
    builder.addCase(addMyVisor.fulfilled, (state, action) => {
      if (action.payload) {
        state.data.push(action.payload)
      }
      state.loading = false
      state.success = true
      state.error = undefined
    })
    builder.addCase(addMyVisor.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.error.message
    })

    builder.addCase(loadMyVisors.pending, state => {
      state.loading = true
      state.success = undefined
      state.error = undefined
    })
    builder.addCase(loadMyVisors.fulfilled, state => {
      state.loading = false
      state.success = true
      state.error = undefined
    })
    builder.addCase(loadMyVisors.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.error.message
    })
  },
})

export const { updateVisorLabel, removeVisor } = myVisorsSlice.actions

export default myVisorsSlice.reducer
