/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Provider } from 'react-redux'
import store from '../state/store'
import customTheme from '../theme/theme'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={customTheme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
