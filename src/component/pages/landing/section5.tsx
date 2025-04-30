import { COLOR } from '@/config/colors';
import { SIZE_CONFIG } from '@/config/size_config';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';
import {
  Box,
  Button,
  Group,
  NumberFormatter,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Children } from 'react';

const DATA = [
  {
    place: 'FIRST RUNNER-UP',
    description:
      'You might have missed top honors, but you &apos;re still taking home more than $2,500 in cash and prizes.',
    prize: 2500,
  },
  {
    place: 'FIRST RUNNER-UP',
    description:
      'You might have missed top honors, but you &apos;re still taking home more than $2,500 in cash and prizes.',
    prize: 2500,
  },
  {
    place: 'FIRST RUNNER-UP',
    description:
      'You might have missed top honors, but you &apos;re still taking home more than $2,500 in cash and prizes.',
    prize: 2500,
  },
  {
    place: 'FIRST RUNNER-UP',
    description:
      'You might have missed top honors, but you &apos;re still taking home more than $2,500 in cash and prizes.',
    prize: 2500,
  },
  {
    place: 'FIRST RUNNER-UP',
    description:
      'You might have missed top honors, but you &apos;re still taking home more than $2,500 in cash and prizes.',
    prize: 2500,
  },
  {
    place: 'FIRST RUNNER-UP',
    description:
      'You might have missed top honors, but you &apos;re still taking home more than $2,500 in cash and prizes.',
    prize: 2500,
  },
];

export const LandingSectionFive = () => {
  const { MD } = useMediaQuerys();
  return (
    <>
      <Stack
        px={MD ? SIZE_CONFIG.PADDING_X : 'md'}
        py={SIZE_CONFIG.SECTION_SPACE}
        align="center"
      >
        <Title c={COLOR.GREEN} size="5vw">
          Prizes!
        </Title>
        <Text c={COLOR.PEACH} size="xl" maw={500} ta="center">
          Prizes will be paid in US dollars. Subscribe to keep up with the
          latest CloneComp news.
        </Text>
        <Button size="xl">Create Locus Account</Button>
        <Stack py={SIZE_CONFIG.SECTION_SPACE}>
          <Paper
            py="xl"
            style={{
              zIndex: 0,
              position: 'relative',
            }}
            p="xl"
            w="100%"
            withBorder
          >
            <Box
              w={50}
              p="sm"
              bg="green"
              style={{
                position: 'absolute',
                top: -10,
                right: 20,
                zIndex: 1,
              }}
            >
              <Stack align="center">
                <Text>1</Text>
              </Stack>
            </Box>
            <Stack align="center">
              <Title size={'xl'}>GRAND PRIZE</Title>
              <Text ta="center" maw={500}>
                This year we will be awarding $5,000 in cash to the first place
                winner along with a crystal trophy and an all expenses paid trip
                to #NoCodeConf in San Francisco this November. To win this
                you&aposl;ll have to wow the judges as well as other
                participants.
              </Text>
              <Group justify="space-evenly" w="100%">
                <NumberFormatter
                  style={{ fontSize: '30px', fontWeight: 'bold' }}
                  value={5000}
                  prefix="$"
                  thousandSeparator
                />
                <Title size={MD ? '2vw' : '7vw'}>Trophy</Title>
                <Title size={MD ? '2vw' : '7vw'}>Trophy #Locus </Title>
              </Group>
            </Stack>
          </Paper>
          <SimpleGrid cols={{ base: 1, md: 3 }}>
            {Children.toArray(
              DATA.map((data, index) => (
                <>
                  <Paper
                    style={{
                      zIndex: 0,
                      position: 'relative',
                    }}
                    key={index}
                    p="xl"
                    withBorder
                  >
                    <Box
                      w={50}
                      p="sm"
                      bg="green"
                      style={{
                        position: 'absolute',
                        top: -10,
                        right: 20,
                        zIndex: 1,
                      }}
                    >
                      <Stack align="center">{index + 2}</Stack>
                    </Box>
                    <Stack align="center">
                      <Title size={'xl'}>{data.place}</Title>
                      <Text ta="center">{data.description}</Text>
                      <NumberFormatter
                        style={{ fontSize: '30px', fontWeight: 'bold' }}
                        value={data.prize}
                        prefix="$"
                        thousandSeparator
                      />
                    </Stack>
                  </Paper>
                </>
              ))
            )}
          </SimpleGrid>
        </Stack>
      </Stack>
    </>
  );
};
