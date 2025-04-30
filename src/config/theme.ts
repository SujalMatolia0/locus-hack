import { createTheme } from '@mantine/core';
import { COLOR } from './colors';

export const Theme = createTheme({
  components: {
    Button: {
      defaultProps: {
        color: COLOR.TURQUOISE,
        c: COLOR.PEACH,
        fw: 300,
        variant: 'filled',
      },
    },
  },
});
