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
    key: VisorKey
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
    addNewVisor: (state, { payload: { key, label } }: AddNewVisorAction) => {
      const newVisor = {
        key,
        label: label || 'Visor',
      }
      state.visors = [...state.visors, newVisor]
    },
    updateVisorLabel: (
      state,
      { payload: { key, label } }: UpdateVisorAction
    ) => {
      const canFindVisorToUpdate = state.visors.find(
        (visor) => visor.key === key
      )
      if (canFindVisorToUpdate) {
        const updatedVisor = { label, key }
        const updatedVisorsList = state.visors.map((visor) =>
          visor.key === key ? updatedVisor : visor
        )
        state.visors = updatedVisorsList
      }
    },
    removeVisor: (state, { payload: { key } }) => {
      state.visors = state.visors.filter((visor) => visor.key !== key)
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
