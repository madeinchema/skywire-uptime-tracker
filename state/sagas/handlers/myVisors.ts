import { all, put, select } from 'redux-saga/effects'
import { VisorKey, VisorUptime } from '../../../interfaces'
import { addMyVisorSuccess } from '../../slices/myVisorsSlice'
import { createToast } from '../../slices/toastsSlice'

const checkCanFindVisorByKey = (visorsToCheck, visorKey: VisorKey): boolean => {
  const isVisorDataFound = visorsToCheck.some(
    (visor: VisorUptime) => visor.visorKey === visorKey
  )
  return isVisorDataFound
}

export function* handleLoadMyVisors({ payload }) {
  // TODO: LocalStorage & URL Query Strings
  try {
    const visorsData = yield select(state => state.visors.data)
    const myVisorsData = yield select(state => state.myVisors.data)
    const payloadArray = Array.isArray(payload) ? payload : [...payload]

    yield all(
      payloadArray.map(myVisorData => {
        const canFindVisor = checkCanFindVisorByKey(
          visorsData,
          myVisorData.visorKey
        )
        const isVisorAlreadySaved = checkCanFindVisorByKey(
          myVisorsData,
          myVisorData.visorKey
        )

        if (!canFindVisor) {
          return put(
            createToast({
              title: `Could not find visor: ${myVisorData.label}`,
              description: myVisorData.visorKey,
              status: 'error',
            })
          )
        }
        if (isVisorAlreadySaved) {
          return put(
            createToast({
              title: `This visor was already in your list: ${myVisorData.label}`,
              description: myVisorData.visorKey,
              status: 'info',
            })
          )
        }
        return put(
          addMyVisorSuccess({
            visorKey: myVisorData.visorKey,
            label: myVisorData.label,
          })
        )
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export function* handleAddMyVisor({ payload: myVisorData }) {
  const visorsData = yield select(state => state.visors.data)
  const myVisorsData = yield select(state => state.myVisors.data)
  try {
    const canFindVisor = checkCanFindVisorByKey(
      visorsData,
      myVisorData.visorKey
    )
    const isVisorAlreadySaved = checkCanFindVisorByKey(
      myVisorsData,
      myVisorData.visorKey
    )
    if (!canFindVisor) {
      yield put(
        createToast({
          title: `Could not find visor: ${myVisorData.label}`,
          description: myVisorData.visorKey,
          status: 'error',
        })
      )
    }
    if (isVisorAlreadySaved) {
      yield put(
        createToast({
          title: `This visor was already in your list: ${myVisorData.label}`,
          description: myVisorData.visorKey,
          status: 'info',
        })
      )
    }
    yield put(
      addMyVisorSuccess({
        visorKey: myVisorData.visorKey,
        label: myVisorData.label,
      })
    )
  } catch (error) {
    console.log(error)
  }
}
