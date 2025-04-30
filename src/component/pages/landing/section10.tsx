import { Box, Stack, Text, Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';

const DATA = [
  {
    description:
      'The show Chopped but w designers being given some colors and fonts.',
    name: 'Sagar Kumar',
    post: 'CEO, Company',
  },
  {
    description:
      'The show Chopped but w designers being given some colors and fonts.',
    name: 'Sagar Kumar',
    post: 'CEO, Company',
  },
  {
    description:
      'The show Chopped but w designers being given some colors and fonts.',
    name: 'Sagar Kumar',
    post: 'CEO, Company',
  },
];

export const LandingSectionTen = () => {
  const { MD } = useMediaQuerys();

  return (
    <Stack bg="white" py={MD ? 70 : 40} px={MD ? 32 : 16} align="center">
      <Title order={MD ? 2 : 3} ta="center" mb={MD ? 30 : 20} fw={700}>
        WHAT THEY&apos;RE SAYIN&apos;!
      </Title>

      <Carousel
        slideSize={MD ? '70%' : '100%'}
        align={MD ? 'center' : 'start'}
        height={MD ? 300 : 240}
        withIndicators={false}
        withControls={false}
        loop
      >
        {DATA.map((item, index) => (
          <Carousel.Slide key={index}>
            <Box
              p={MD ? 'xl' : 'md'}
              style={{
                background:
                  'linear-gradient(to right, #01373d, #c1f43d, #f2e0c9)',
                color: 'white',
                transform: 'skew(-10deg)',
                border: '2px solid #01373d',
                borderTop: 'none',
                borderLeft: 'none',
                boxShadow: '0px 6px 0px 0px #01373d',
                maxWidth: MD ? 600 : '90%',
                margin: 'auto',
              }}
            >
              <Box style={{ transform: 'skew(10deg)' }}>
                <Text size={MD ? 'lg' : 'sm'} mb="md" fw={500}>
                  {item.description}
                </Text>
                <Text size={MD ? 'lg' : 'md'} mt="lg" fw={700}>
                  {item.name}
                </Text>
                <Text size="sm" c="gray.2">
                  {item.post}
                </Text>
              </Box>
            </Box>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Stack>
  );
};
