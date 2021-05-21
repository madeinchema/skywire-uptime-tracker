import { useToast } from '@chakra-ui/toast'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeToast } from '../state/slices/toastsSlice'

const useToasts = (): void => {
  const toasts = useSelector(state => state.toasts)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    if (toasts.data.length > 0) {
      toasts.data.forEach(toastData => {
        toast({
          ...toastData,
          onCloseComplete: () => dispatch(removeToast(toastData.id)),
        })
      })
    }
  }, [dispatch, toast, toasts.data])
}

export default useToasts
