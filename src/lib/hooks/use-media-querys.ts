import { BREAKPOINTS } from '@/config/size_config';
import { useMediaQuery } from '@mantine/hooks';

/**
 * Custom hook to handle media queries.
 * Returns an object with boolean values indicating whether the screen size matches the specified breakpoints.
 */
export const useMediaQuerys = () => {
  // Big Than
  const BigXS = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);
  const BigSM = useMediaQuery(`(min-width: ${BREAKPOINTS.SM})`);
  const BigMD = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`, true);
  const BigLG = useMediaQuery(`(min-width: ${BREAKPOINTS.LG})`);
  const BigXL = useMediaQuery(`(min-width: ${BREAKPOINTS.XL})`);

  return {
    XS: BigXS,
    SM: BigSM,
    MD: BigMD,
    LG: BigLG,
    XL: BigXL,
  };
};
