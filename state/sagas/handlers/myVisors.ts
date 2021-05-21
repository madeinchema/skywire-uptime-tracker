import { all, put, select } from 'redux-saga/effects'
import { addNewVisor } from '../../slices/myVisorsSlice'
import { createToast } from '../../slices/toastsSlice'

export function* handleAddMyVisors({ payload }) {
  try {
    const visorsData = yield select(state => state.visors.data)
    const myVisorsData = yield select(state => state.myVisors.data)
    const payloadArray = Array.isArray(payload) ? payload : [payload]

    yield all(
      payloadArray.map(myVisorData => {
        const isVisorFound = visorsData.find(
          visorData => visorData.visorKey === myVisorData.visorKey
        )
        const isVisorAlreadySaved =
          isVisorFound &&
          myVisorsData.find(
            myVisor => myVisor.visorKey === isVisorFound.visorKey
          )

        if (!isVisorFound) {
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
          addNewVisor({
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
