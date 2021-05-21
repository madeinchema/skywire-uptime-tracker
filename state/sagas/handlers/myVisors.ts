import { all, put, select } from 'redux-saga/effects'
import { addNewVisor } from '../../slices/myVisorsSlice'
import { createToast } from '../../slices/toastsSlice'

export function* handleAddMyVisors({ payload }) {
  try {
    const visorsData = yield select(state => state.visors.data)

    yield all(
      payload.map(myVisorData => {
        const canFindVisorData = visorsData.find(
          visorData => visorData.visorKey === myVisorData.visorKey
        )
        if (!canFindVisorData) {
          return put(
            createToast({
              title: `Could not find visor: ${myVisorData.label}`,
              description: myVisorData.visorKey,
              status: 'error',
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
