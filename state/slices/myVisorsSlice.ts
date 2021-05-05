import { createSlice } from '@reduxjs/toolkit'
import { MyVisor } from '../../interfaces'

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
    addNewVisor: (state, action: AddNewVisorAction) => {
      const newVisor = {
        ...action.payload,
        label: action.payload.label || 'Visor',
      }
      state.visors = [...state.visors, newVisor]
    },
  },
})

export const { addNewVisor, saveMyVisorsData } = myVisorsSlice.actions

export default myVisorsSlice.reducer
