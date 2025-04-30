import { Center, Stack, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';
import { HEIGHT } from './const';

interface CenteredMessagePrope {
  title: ReactNode;
  message: ReactNode;
  h?: string;
}

export const CenteredMessage = (props: CenteredMessagePrope) => {
  return (
    <>
      <Center h={props.h ?? HEIGHT.INFO}>
        <Stack justify="center" gap="xs">
          <Title fw="bold" ta="center">
            {props.title}
          </Title>

          <Text ta="center" c="dimmed" size="xs">
            {props.message}
          </Text>
        </Stack>
      </Center>
    </>
  );
};
