import { combineReducers, configureStore } from '@reduxjs/toolkit'

import visorsReducer from './slices/visorsSlice'
import myVisorsReducer from './slices/myVisorsSlice'
import checkedVisorReducer from './slices/checkVisorSlice'
import toastsReducer from './slices/toastsSlice'

const reducer = combineReducers({
  visors: visorsReducer,
  myVisors: myVisorsReducer,
  checkedVisor: checkedVisorReducer,
  toasts: toastsReducer,
})

export default configureStore({
  reducer,
})
