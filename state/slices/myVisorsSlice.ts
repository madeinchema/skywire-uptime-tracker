import { createSlice } from '@reduxjs/toolkit';
import { MyVisor } from '../../interfaces';

type MyVisorsState = {
  visors: MyVisor[];
};

interface AddNewVisorAction {
  type: string;
  payload: MyVisor;
}

const initialState: MyVisorsState | [] = {
  visors: [],
};

export const myVisorsSlice = createSlice({
  name: 'myVisors',
  initialState,
  reducers: {
    saveMyVisorsData: (state, action) => {
      state.visors = action.payload;
    },
    addNewVisor: (state, action: AddNewVisorAction) => {
      state.visors = [...state.visors, action.payload];
    },
  },
});

export const { addNewVisor, saveMyVisorsData } = myVisorsSlice.actions;

export default myVisorsSlice.reducer;
