import { configureStore } from '@reduxjs/toolkit';
import visorsUptimeReducer from '../state/slices/visorsUptimeSlice';

export default configureStore({
  reducer: {
    visorsUptime: visorsUptimeReducer,
  },
});
