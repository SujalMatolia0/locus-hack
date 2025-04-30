import { SIZE_CONFIG } from '@/config/size_config';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';
import {
  AspectRatio,
  Button,
  Divider,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconCopy,
  IconExternalLink,
  IconThumbDown,
  IconThumbUp,
} from '@tabler/icons-react';
import Link from 'next/link';
import { Children } from 'react';

const DATA = [
  {
    link: '/',
    image:
      'https://img.freepik.com/free-photo/3d-render-abstract-technology-with-flowing-particles_1048-13794.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
    name: 'Phantom',
    clone: 'https://github.com',
    like: 12,
    dislike: 1,
  },
  {
    link: '/',
    image:
      'https://img.freepik.com/free-photo/3d-render-abstract-technology-with-flowing-particles_1048-13794.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
    name: 'Phantom',
    clone: 'https://github.com',
    like: 12,
    dislike: 1,
  },
  {
    link: '/',
    image:
      'https://img.freepik.com/free-photo/3d-render-abstract-technology-with-flowing-particles_1048-13794.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
    name: 'Phantom',
    clone: 'https://github.com',
    like: 12,
    dislike: 1,
  },
  {
    link: '/',
    image:
      'https://img.freepik.com/free-photo/3d-render-abstract-technology-with-flowing-particles_1048-13794.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
    name: 'Phantom',
    clone: 'https://github.com',
    like: 12,
    dislike: 1,
  },
  {
    link: '/',
    image:
      'https://img.freepik.com/free-photo/3d-render-abstract-technology-with-flowing-particles_1048-13794.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
    name: 'Phantom',
    clone: 'https://github.com',
    like: 12,
    dislike: 1,
  },
];

export const GalleryHero = () => {
  const { MD } = useMediaQuerys();
  return (
    <>
      <Stack px={MD ? SIZE_CONFIG.PADDING_X : 'md'} align="center">
        <Title>Locus Gallery</Title>
        <Text>Powered by: Jetboost and Nobull Airtable</Text>
        <Group>
          <Button>Round1</Button>
          <Button>Round2</Button>
          <Button>Round3</Button>
        </Group>

        <SimpleGrid cols={{ base: 1, md: 3 }}>
          {Children.toArray(
            DATA.map((data, index) => (
              <>
                <Paper
                  bg="transparent"
                  key={index}
                  component={Link}
                  href={data.link}
                  p="xl"
                  withBorder
                >
                  <Stack>
                    <AspectRatio ratio={16 / 9}>
                      <Image src={data.image} alt="project-image" />
                    </AspectRatio>
                    <Stack gap="sm">
                      <Group>
                        <IconExternalLink />
                        <Text>{data.name}</Text>
                      </Group>
                      <Divider />
                      <Group>
                        <IconCopy />
                        <Text component="a" href={data.clone}>
                          Clone Project
                        </Text>
                      </Group>
                    </Stack>
                    <Group justify="space-between">
                      <Button radius="xl" w="40%">
                        {data.like}
                        <IconThumbUp />
                      </Button>
                      <Button radius="xl" w="40%">
                        {data.dislike}
                        <IconThumbDown />
                      </Button>
                    </Group>
                  </Stack>
                </Paper>
              </>
            ))
          )}
        </SimpleGrid>
      </Stack>{' '}
    </>
  );
};
