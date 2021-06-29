import { createAsyncThunk } from '@reduxjs/toolkit'
import { MyVisor } from '../../../interfaces'
import { createToast } from '../../slices/toastsSlice'
import { addMyVisor } from './addMyVisor'

export const loadMyVisors = createAsyncThunk(
  'myVisors/loadMyVisors',
  async (visorsToLoad: MyVisor[], { dispatch }) => {
    const uniqueLoadedVisors = Array.from(
      new Set(visorsToLoad.map(visorToLoad => visorToLoad.visorKey))
    ).map(visorKey =>
      visorsToLoad.find(visorToLoad => visorToLoad.visorKey === visorKey)
    )

    if (uniqueLoadedVisors.length > 0) {
      dispatch(
        createToast({
          title: `Loading visors from URL.`,
          status: 'info',
        })
      )
    }

    uniqueLoadedVisors.forEach(async uniqueVisorFromUrl => {
      if (uniqueVisorFromUrl) {
        dispatch(
          addMyVisor({
            visorKey: uniqueVisorFromUrl.visorKey,
            label: uniqueVisorFromUrl.label,
          })
        )
      }
    })
  }
)
