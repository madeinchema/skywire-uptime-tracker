import { put, select } from 'redux-saga/effects'
import { setCheckedVisor } from '../../slices/checkVisorSlice'
import { createToast } from '../../slices/toastsSlice'

export function* handleCheckVisor({ payload }) {
  try {
    const visorsData = yield select(state => state.visors.data)
    const visorFound = yield visorsData.find(
      visor => visor.visorKey === payload.visorKey
    )
    yield put(
      setCheckedVisor({
        loading: true,
      })
    )

    if (!visorFound) {
      yield put(
        setCheckedVisor({
          data: [],
          loading: false,
          success: false,
          error: 'Visor not found',
        })
      )
      yield put(
        createToast({
          ...payload.notFoundToast,
        })
      )
      return
    }
    yield put(
      setCheckedVisor({
        data: visorFound,
        loading: false,
        success: true,
      })
    )
  } catch (error) {
    console.log(error)
  }
}