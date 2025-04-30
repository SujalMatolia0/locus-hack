import { SIZE_CONFIG } from '@/config/size_config';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';
import { AspectRatio, Image, SimpleGrid, Stack, Text } from '@mantine/core';
import { Children } from 'react';

const DATA = [
  {
    text: 'Competing in CloneComp: Make the Most of This Year’s Competition',
    image:
      'https://cdn.prod.website-files.com/60d1631f3d3f669de9d36e1c/60f5844ff7c9bf9cc911a5ea_CloneComp%20Banner%20Main-p-500.jpeg',
  },
  {
    text: 'Competing in CloneComp: Make the Most of This Year’s Competition',
    image:
      'https://cdn.prod.website-files.com/60d1631f3d3f669de9d36e1c/60f5844ff7c9bf9cc911a5ea_CloneComp%20Banner%20Main-p-500.jpeg',
  },
  {
    text: 'Competing in CloneComp: Make the Most of This Year’s Competition',
    image:
      'https://cdn.prod.website-files.com/60d1631f3d3f669de9d36e1c/60f5844ff7c9bf9cc911a5ea_CloneComp%20Banner%20Main-p-500.jpeg',
  },
];

export const LandingSectionThree = () => {
  const { MD } = useMediaQuerys();
  return (
    <>
      <Stack mt={SIZE_CONFIG.SECTION_SPACE} align="center" bg="gray">
        <SimpleGrid p={SIZE_CONFIG.SECTION_SPACE} cols={{ base: 1, md: 3 }}>
          {Children.toArray(
            DATA.map((item) => (
              <>
                <Stack gap={0}>
                  <Text size="sm" ta={MD ? 'left' : 'center'}>
                    {item.text}
                  </Text>
                  <AspectRatio ratio={16 / 9}>
                    <Image src={item.image} alt="image" />
                  </AspectRatio>
                </Stack>
              </>
            ))
          )}
        </SimpleGrid>
      </Stack>
    </>
  );
};
