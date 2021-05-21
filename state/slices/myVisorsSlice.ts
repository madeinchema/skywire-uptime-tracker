import { createSlice } from '@reduxjs/toolkit'
import { VisorKey, MyVisor, VisorLabel } from '../../interfaces/index'

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
interface AddNewVisorAction {
  type: string
  payload: MyVisor
}
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
    addMyVisors() {},
    saveMyVisorsData: (state, action) => {
      state.data = action.payload
    },
    addNewVisor: (
      state,
      { payload: { visorKey, label } }: AddNewVisorAction
    ) => {
      const newVisor = {
        visorKey,
        label: label || 'Visor',
      }
      state.data = [...state.data, newVisor]
    },
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
})

export const {
  addMyVisors,
  addNewVisor,
  saveMyVisorsData,
  updateVisorLabel,
  removeVisor,
} = myVisorsSlice.actions

export default myVisorsSlice.reducer
