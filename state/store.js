import { configureStore } from '@reduxjs/toolkit';
import visorsUptimeReducer from './slices/visorsUptimeSlice';

export default configureStore({
  reducer: {
    visorsUptime: visorsUptimeReducer,
  },
});
