import { COLOR } from '@/config/colors';
import { SIZE_CONFIG } from '@/config/size_config';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';
import {
  AspectRatio,
  Grid,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconBrandTwitter } from '@tabler/icons-react';
import Link from 'next/link';
import { Children } from 'react';

const DATA = [
  {
    image:
      'https://cdn.prod.website-files.com/60d1631f3d3f669de9d36e1c/60d170a31698c91bc2a6011f_Joe%20Krug.jpeg',
    name: 'Joe Krug',
    position: 'CEO @ Locus',
    link: '/',
  },
  {
    image:
      'https://cdn.prod.website-files.com/60d1631f3d3f669de9d36e1c/60d170a31698c91bc2a6011f_Joe%20Krug.jpeg',
    name: 'Joe Krug',
    position: 'CEO @ Locus',
    link: '/',
  },
  {
    image:
      'https://cdn.prod.website-files.com/60d1631f3d3f669de9d36e1c/60d170a31698c91bc2a6011f_Joe%20Krug.jpeg',
    name: 'Joe Krug',
    position: 'CEO @ Locus',
    link: '/',
  },
  {
    image:
      'https://cdn.prod.website-files.com/60d1631f3d3f669de9d36e1c/60d170a31698c91bc2a6011f_Joe%20Krug.jpeg',
    name: 'Joe Krug',
    position: 'CEO @ Locus',
    link: '/',
  },
];
export const LandingSectionSeven = () => {
  const { MD } = useMediaQuerys();
  return (
    <>
      <Grid
        px={SIZE_CONFIG.PADDING_X}
        columns={12}
        py={SIZE_CONFIG.SECTION_SPACE}
      >
        <Grid.Col span={{ base: 12, md: 'auto' }}>
          <Title c={COLOR.GREEN}>Meet the organizers</Title>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <SimpleGrid spacing="xs" cols={{ base: 1, md: 2 }}>
            {Children.toArray(
              DATA.map((data) => (
                <>
                  <Paper p="md">
                    <Stack gap={0}>
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          src={data.image}
                          alt={` image of ${data.name} `}
                        />
                      </AspectRatio>
                      <Group gap={0}>
                        <Paper
                          component={Link}
                          href={data.link}
                          withBorder
                          p={MD ? 'xl' : 'md'}
                        >
                          <Group>
                            <IconBrandTwitter />
                            <Text>{data.name}</Text>
                          </Group>
                        </Paper>
                        <Paper withBorder p={MD ? 'xl' : 'md'}>
                          <Text>{data.position}</Text>
                        </Paper>
                      </Group>
                    </Stack>
                  </Paper>
                </>
              ))
            )}
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </>
  );
};
