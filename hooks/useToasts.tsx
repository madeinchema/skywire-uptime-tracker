import { useToast } from '@chakra-ui/toast'
import { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Toast } from '../interfaces'
import { removeToast, setToastShown } from '../state/slices/toastsSlice'

const useToasts = (): void => {
  const toasts = useSelector((state: RootStateOrAny) => state.toasts)
  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    toasts.data.forEach((toastData: Toast) => {
      if (!toastData.shown) {
        toast({
          ...toastData,
          onCloseComplete: () => dispatch(removeToast(toastData.id)),
        })
        dispatch(setToastShown(toastData.id))
      }
    })
  }, [dispatch, toast, toasts.data])
}

export default useToasts
