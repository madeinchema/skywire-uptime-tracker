import { configureStore } from '@reduxjs/toolkit'
import visorsReducer from './slices/visorsSlice'
import myVisorsReducer from './slices/myVisorsSlice'

export default configureStore({
  reducer: {
    visors: visorsReducer,
    myVisors: myVisorsReducer,
  },
})
