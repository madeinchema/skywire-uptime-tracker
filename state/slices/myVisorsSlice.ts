import { createSlice } from '@reduxjs/toolkit';
import { MyVisor } from '../../interfaces';

type MyVisorsState = {
  myVisors: MyVisor[];
};

interface AddNewVisorAction {
  type: string;
  payload: MyVisor;
}

const initialState: MyVisorsState | [] = {
  myVisors: [],
};

export const myVisorsSlice = createSlice({
  name: 'myVisors',
  initialState,
  reducers: {
    addNewVisor: (state, action: AddNewVisorAction) => {
      state.myVisors = [...state.myVisors, action.payload];
    },
  },
});

export const { addNewVisor } = myVisorsSlice.actions;

export default myVisorsSlice.reducer;
