import { configureStore } from '@reduxjs/toolkit';
import visorsUptimeReducer from './slices/visorsUptimeSlice';
import myVisorsReducer from './slices/myVisorsSlice';

export default configureStore({
  reducer: {
    visorsUptime: visorsUptimeReducer,
    myVisors: myVisorsReducer,
  },
});
