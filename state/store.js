import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { watcherSaga } from './sagas/rootSaga'

import visorsReducer from './slices/visorsSlice'
import myVisorsReducer from './slices/myVisorsSlice'
import checkedVisorReducer from './slices/checkVisorSlice'
import toastsReducer from './slices/toastsSlice'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  visors: visorsReducer,
  myVisors: myVisorsReducer,
  checkedVisor: checkedVisorReducer,
  toasts: toastsReducer,
})

const middleware = [...getDefaultMiddleware(), sagaMiddleware]
export default configureStore({
  reducer,
  middleware,
})
sagaMiddleware.run(watcherSaga)
