import localFont from 'next/font/local';

const NexaFont = localFont({
  src: [
    {
      path: '../../public/fonts/Nexa-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Nexa-Light.woff2',
      weight: '300',
      style: 'normal',
    },
  ],
});

const OpticianSansFont = localFont({
  src: '../../public/fonts/OpticianSans-Regular.woff2',
  style: 'normal',
  weight: '400',
});

export const FONTS = {
  NEXA: NexaFont.style.fontFamily,
  OPTICIAN_SANS: OpticianSansFont.style.fontFamily,
};
