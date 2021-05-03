import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

/**
 * Table component
 */
const Table = {
  variants: {
    custom: (props) => ({
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
};

/**
 * Custom theme
 */
const theme = extendTheme({
  components: {
    Table,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.50', 'black')(props),
      },
    }),
  },
});

export default theme
