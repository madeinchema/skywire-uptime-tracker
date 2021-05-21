import { spawn, takeLatest } from 'redux-saga/effects'

import { checkVisor } from '../slices/checkVisorSlice'
import { handleCheckVisor } from './handlers/checkVisor'
import { addMyVisors } from '../slices/myVisorsSlice'
import { handleAddMyVisors } from './handlers/myVisors'

export function* watcherSaga() {
  yield takeLatest(checkVisor.type, handleCheckVisor)
}

export function* watchMyVisors() {
  yield takeLatest(addMyVisors.type, handleAddMyVisors)
}

export function* rootSaga() {
  yield spawn(watcherSaga)
  yield spawn(watchMyVisors)
}
