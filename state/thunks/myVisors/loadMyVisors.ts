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
