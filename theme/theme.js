import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode('gray.50', 'black')(props),
      },
    }),
  },
});

export { theme as customTheme };
