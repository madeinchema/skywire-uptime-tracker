import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

interface Toast {
  id: string
  title: string
  status: 'info' | 'warning' | 'success' | 'error'
}

/**
 * State
 */
type ToastsState = {
  data: Toast[]
  loading: boolean
  success: boolean | undefined
  error: string | undefined
}

const initialState: ToastsState = {
  data: [],
  loading: false,
  success: false,
  error: undefined,
}
/**
 * Slice
 */
export const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    createToast: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{
          id: string
          title: string
          isClosable: boolean
        }>
      ) => {
        state.data.unshift(payload)
      },
      prepare: payload => ({
        payload: {
          ...payload,
          id: nanoid(),
        },
      }),
    },
    removeToast: (state, { payload }) => {
      state.data = state.data.filter(toast => toast.id !== payload)
    },
  },
})

export const { createToast, removeToast } = toastsSlice.actions

export default toastsSlice.reducer
