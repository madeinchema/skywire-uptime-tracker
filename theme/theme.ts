import { ChakraProps, extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

/**
 * Table component
 */
const Table: any = {
  variants: {
    custom: (props: ChakraProps) => ({
      thead: {
        tr: {
          th: {
            background: mode('gray.100', 'gray.900')(props),
          },
        },
      },
      tr: {
        _odd: {
          background: mode('gray.200', 'gray.800')(props),
        },
        _even: { background: mode('gray.100', 'gray.900')(props) },
      },
    }),
  },
}

/**
 * Config
 */
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

/**
 * Custom theme
 */
const theme = extendTheme({
  config,
  components: {
    Table,
  },
  styles: {
    global: props => ({
      body: {
        bg: mode('gray.50', 'black')(props),
      },
    }),
  },
})

export default theme
