import { createSlice } from '@reduxjs/toolkit'
import { MyVisor } from '../../interfaces'

type MyVisorsState = {
  visors: MyVisor[]
}

interface AddNewVisorAction {
  type: string
  payload: MyVisor
}

const initialState: MyVisorsState | [] = {
  visors: [],
}

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
