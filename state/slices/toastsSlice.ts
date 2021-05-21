import { UseToastOptions } from '@chakra-ui/toast'
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

type Toast = UseToastOptions & {
  shown: boolean
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
      reducer: (state, { payload }: PayloadAction<Toast>) => {
        state.data.unshift(payload)
      },
      prepare: payload => {
        const toastId = nanoid()
        return {
          payload: {
            ...payload,
            id: toastId,
            shown: false,
          },
        }
      },
    },
    setToastShown: (state, { payload }) => {
      state.data = state.data.map(toast =>
        toast.id === payload ? { ...toast, shown: true } : toast
      )
    },
    removeToast: (state, { payload }) => {
      state.data = state.data.filter(toast => toast.id !== payload)
    },
  },
})

export const { createToast, setToastShown, removeToast } = toastsSlice.actions

export default toastsSlice.reducer
