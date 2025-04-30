import { COLOR } from '@/config/colors';
import { Button, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';

export const CommonFooter = () => {
  const { MD } = useMediaQuerys();

  return (
    <Stack mih="30vh" align="center" px={MD ? 0 : 16} py={MD ? 60 : 30}>
      <Title
        c={COLOR.GREEN}
        size={MD ? '5vw' : '8vw'}
        ta="center"
        tt="capitalize"
        fw={700}
      >
        HACKSPHERE
      </Title>

      <Stack align="center" w="100%">
        <Group
          p="2px"
          style={{
            border: '2px solid white',
            borderRadius: '999px',
            overflow: 'hidden',
            maxWidth: MD ? 500 : '100%',
            width: '100%',
            margin: 'auto',
          }}
        >
          <TextInput
            placeholder="Enter your email"
            variant="unstyled"
            px="md"
            styles={{
              input: {
                color: '#ccc',
                fontWeight: 600,
                height: '48px',
                fontSize: MD ? '1rem' : '0.875rem',
              },
            }}
            style={{
              flex: 1,
            }}
          />

          <Button
            color={COLOR.TURQUOISE}
            c={COLOR.GREEN}
            variant="filled"
            radius="xl"
            style={{
              height: '48px',
              fontSize: MD ? '1rem' : '0.875rem',
            }}
          >
            Submit
          </Button>
        </Group>
      </Stack>

      <Text
        c={COLOR.PEACH}
        size={MD ? 'xl' : 'sm'}
        maw={500}
        ta="center"
        px={MD ? 0 : 10}
      >
        Enter your email for updates and to receive instructions on how to
        participate as we get closer to the event.
      </Text>
    </Stack>
  );
};
