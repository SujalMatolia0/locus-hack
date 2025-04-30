import { COLOR } from '@/config/colors';
import { SIZE_CONFIG } from '@/config/size_config';
import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { Children } from 'react';

const DATA = [
  {
    title: 'WHAT IS ',
    titleSpan: '#HACKSPHERE',
    heading: 'Welcome to the Future of Hackathons — Powered by HACKSPHERE',
    description: [
      'HackSphere is a multi-day innovation sprint built for coders, designers, and problem-solvers to unleash their ideas, learn, and create — together.',
      'Inspired by real-world challenges, HackSphere provides exciting prompts and themes that drive creativity, collaboration, and competition.',
    ],
    button: 'Explore Guidelines & FAQ',
  },
  {
    title: 'WHY  ',
    titleSpan: '#PARTICIPATE',
    heading: 'Win Rewards. Earn Recognition.',
    description: [
      'Winning HackSphere puts you on the map — unlock prizes, gain visibility, and join an elite league of builders from around the globe.',
      "Backed by powerful tech partners and sponsors, HackSphere's prize pool ensures fierce competition and massive opportunities.",
    ],
    button: ' Explore Rewards',
  },
  {
    title: 'ALL ABOUT   ',
    titleSpan: '#COMMUNITY',
    heading: 'Driven by Developers, Designers, and Dreamers Worldwide.',
    description: [
      'HackSphere was envisioned by a global team passionate about empowering communities through open innovation and inclusive hackathons.',
      'HackSphere is scaling up, with bigger ideas, broader reach, and deeper impact. Are you ready to build the future?',
    ],
    button: 'Explore Our Journey',
  },
];

export const LandingSectionTwo = () => {
  return (
    <>
      <Container
        size="lg"
        my={SIZE_CONFIG.SECTION_SPACE}
        style={{ position: 'relative' }}
      >
        <Group>
          <Divider
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 30,
              width: 2,
              backgroundColor: COLOR.GREEN,
            }}
          />
          <SimpleGrid px={SIZE_CONFIG.PADDING_X} cols={{ base: 1, md: 2 }}>
            {Children.toArray(
              DATA.map((item) => (
                <>
                  <Stack py="xl" gap={0}>
                    <Title order={3} fw={900} size="2vw">
                      {item.title}
                    </Title>
                    <Title style={{ color: COLOR.GREEN }} size="3vw">
                      {item.titleSpan}
                    </Title>
                  </Stack>
                  <Box py="xl" maw={600}>
                    <Title c={COLOR.GREEN} size="1.5vw" fw={700}>
                      {item.heading}
                    </Title>
                    {item.description.map((txt) => (
                      <Text mt="xs">{txt}</Text>
                    ))}
                    <Button
                      mt="md"
                      size="md"
                      radius="xl"
                      variant="filled"
                      rightSection={<IconArrowRight size={18} />}
                      styles={{
                        root: {
                          fontWeight: 700,
                          paddingLeft: 24,
                          paddingRight: 24,
                        },
                      }}
                    >
                      {item.button}
                    </Button>
                  </Box>
                </>
              ))
            )}
          </SimpleGrid>
        </Group>
      </Container>
    </>
  );
};
