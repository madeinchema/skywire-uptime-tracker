/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { spawn, takeLatest } from 'redux-saga/effects'

import { checkVisor } from '../slices/checkVisorSlice'
import { handleCheckVisor } from './handlers/checkVisor'
import { addMyVisor, loadMyVisors } from '../slices/myVisorsSlice'
import { handleAddMyVisor, handleLoadMyVisors } from './handlers/myVisors'

export function* watcherSaga() {
  yield takeLatest(checkVisor.type, handleCheckVisor)
}

export function* watchLoadMyVisors() {
  yield takeLatest(loadMyVisors.type, handleLoadMyVisors)
}
export function* watchAddMyVisor() {
  yield takeLatest(addMyVisor.type, handleAddMyVisor)
}

export function* rootSaga() {
  yield spawn(watcherSaga)
  yield spawn(watchLoadMyVisors)
  yield spawn(watchAddMyVisor)
}
