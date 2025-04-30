import { COLOR } from '@/config/colors';
import { SIZE_CONFIG } from '@/config/size_config';
import {
  AspectRatio,
  Button,
  Grid,
  Image,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { Children } from 'react';

const DATA = [
  {
    title: 'Sponser1',
    image: [
      'https://img.freepik.com/free-vector/slr-camera-grunge-tshirt-design-hand-drawn-sketch-vector-illustration_460848-14467.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
      'https://img.freepik.com/free-vector/slr-camera-grunge-tshirt-design-hand-drawn-sketch-vector-illustration_460848-14467.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
      'https://img.freepik.com/free-vector/slr-camera-grunge-tshirt-design-hand-drawn-sketch-vector-illustration_460848-14467.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
    ],
  },
  {
    title: 'Sponser1',
    image: [
      'https://img.freepik.com/free-vector/slr-camera-grunge-tshirt-design-hand-drawn-sketch-vector-illustration_460848-14467.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
      'https://img.freepik.com/free-vector/slr-camera-grunge-tshirt-design-hand-drawn-sketch-vector-illustration_460848-14467.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
      'https://img.freepik.com/free-vector/slr-camera-grunge-tshirt-design-hand-drawn-sketch-vector-illustration_460848-14467.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
    ],
  },
  {
    title: 'Sponser1',
    image: [
      'https://img.freepik.com/free-vector/slr-camera-grunge-tshirt-design-hand-drawn-sketch-vector-illustration_460848-14467.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
      'https://img.freepik.com/free-vector/slr-camera-grunge-tshirt-design-hand-drawn-sketch-vector-illustration_460848-14467.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
      'https://img.freepik.com/free-vector/slr-camera-grunge-tshirt-design-hand-drawn-sketch-vector-illustration_460848-14467.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740',
    ],
  },
];

export const LandingSectionEight = () => {
  return (
    <>
      <Stack px={SIZE_CONFIG.PADDING_X} py={SIZE_CONFIG.SECTION_SPACE}>
        <Grid columns={12}>
          <Grid.Col span={{ base: 12, md: 'auto' }}>
            <Stack>
              <Title c={COLOR.GREEN}>Event sponsors</Title>
              <Button color={COLOR.PEACH} radius="xl" c={COLOR.TURQUOISE}>
                Become Sponsors
              </Button>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 8 }}>
            {Children.toArray(
              DATA.map((data) => (
                <>
                  <Stack pb="xl">
                    <Title c={COLOR.PEACH}>{data.title}</Title>
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                      {data.image.map((img, index) => (
                        <>
                          <AspectRatio ratio={16 / 9} key={index}>
                            <Image src={img} alt="Image" />
                          </AspectRatio>
                        </>
                      ))}
                    </SimpleGrid>
                    <Image src="/divider.png" alt="divider" />
                  </Stack>
                </>
              ))
            )}
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
};
