import { createSlice } from '@reduxjs/toolkit'
import { VisorKey, MyVisor, VisorLabel } from '../../interfaces/index'

/**
 * State
 */
type MyVisorsState = {
  visors: MyVisor[]
}

const initialState: MyVisorsState | [] = {
  visors: [],
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
    saveMyVisorsData: (state, action) => {
      state.visors = action.payload
    },
    addNewVisor: (
      state,
      { payload: { visorKey, label } }: AddNewVisorAction
    ) => {
      const newVisor = {
        visorKey,
        label: label || 'Visor',
      }
      state.visors = [...state.visors, newVisor]
    },
    updateVisorLabel: (
      state,
      { payload: { visorKey, label } }: UpdateVisorAction
    ) => {
      const canFindVisorToUpdate = state.visors.find(
        visor => visor.visorKey === visorKey
      )
      if (canFindVisorToUpdate) {
        const updatedVisor = { label, visorKey }
        const updatedVisorsList = state.visors.map(visor =>
          visor.visorKey === visorKey ? updatedVisor : visor
        )
        state.visors = updatedVisorsList
      }
    },
    removeVisor: (state, { payload: { visorKey } }) => {
      state.visors = state.visors.filter(visor => visor.visorKey !== visorKey)
    },
  },
})

export const {
  addNewVisor,
  saveMyVisorsData,
  updateVisorLabel,
  removeVisor,
} = myVisorsSlice.actions

export default myVisorsSlice.reducer
