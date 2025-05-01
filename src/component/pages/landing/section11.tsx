import { CommonButton } from '@/component/indie/common_button';
import { SIZE_CONFIG } from '@/config/size_config';
import { BackgroundImage, Stack, Text, Title } from '@mantine/core';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';
import { COLOR } from '@/config/colors';

export const LandingSectionEleven = () => {
  const { MD } = useMediaQuerys();
  const url =
    'https://img.freepik.com/premium-photo/sunrise-through-tree_1171652-15.jpg?uid=R182227931&ga=GA1.1.1627336013.1734516165&semt=ais_hybrid&w=740';

  return (
    <Stack
      py={MD ? SIZE_CONFIG.SECTION_SPACE : 40}
      px={MD ? SIZE_CONFIG.PADDING_X : 16}
    >
      <BackgroundImage radius="xl" mih="100vh" src={url}>
        <Stack justify="space-evenly" h="100vh" align="center">
          <Stack align={MD ? 'center' : 'flex-start'} px={MD ? 0 : 12}>
            <Text
              c={COLOR.PEACH}
              size={MD ? 'lg' : 'sm'}
              ta={MD ? 'center' : 'left'}
            >
              For the first time ever in
            </Text>
            <Title
              order={MD ? 1 : 3}
              c={COLOR.GREEN}
              ta={MD ? 'center' : 'left'}
            >
              Locus Virtual Hub{' '}
            </Title>
          </Stack>

          <Stack align="center" px={MD ? 0 : 12}>
            <Text c={COLOR.PEACH} size={MD ? 'md' : 'sm'} maw={700} ta="center">
              Locus 2025 will take place inside a custom-built interactive
              world in the Locus Virtual Hub – get ready for a uniquely
              immersive and collaborative online hackathon adventure.
            </Text>
            <CommonButton title="Learn More" />
          </Stack>
        </Stack>
      </BackgroundImage>
    </Stack>
  );
};
