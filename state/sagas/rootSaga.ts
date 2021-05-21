import { takeLatest } from 'redux-saga/effects'
import { handleCheckVisor } from './handlers/checkVisor'
import { checkVisor } from '../slices/checkVisorSlice'

export function* watcherSaga() {
  yield takeLatest(checkVisor.type, handleCheckVisor)
}
