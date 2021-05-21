import { fork, spawn, takeLatest } from 'redux-saga/effects'
import { handleCheckVisor } from './handlers/checkVisor'
import { checkVisor } from '../slices/checkVisorSlice'
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
