import { createSlice } from '@reduxjs/toolkit';

export const visorsUptimeSlice = createSlice({
  name: 'visorsUptime',
  initialState: {
    visors: [],
  },
  reducers: {
    saveVisorsUptimeData: (state, action) => {
      state.visors = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveVisorsUptimeData } = visorsUptimeSlice.actions;

export default visorsUptimeSlice.reducer;
