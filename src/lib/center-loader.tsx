import { Center, Loader } from '@mantine/core';
import { HEIGHT } from './const';

interface CenteredLoaderPrope {
  h?: string;
}

export const CenteredLoader = (props: CenteredLoaderPrope) => {
  return (
    <>
      <Center h={props.h ?? HEIGHT.INFO}>
        <Loader />
      </Center>
    </>
  );
};
