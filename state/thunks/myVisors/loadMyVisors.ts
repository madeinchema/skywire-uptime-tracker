import { createAsyncThunk } from '@reduxjs/toolkit'
import { MyVisor } from '../../../interfaces'
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
      uniqueLoadedVisors.forEach(async uniqueVisorFromUrl => {
        dispatch(
          addMyVisor({
            visorKey: uniqueVisorFromUrl.visorKey,
            label: uniqueVisorFromUrl.label,
          })
        )
      })
    }
  }
)
