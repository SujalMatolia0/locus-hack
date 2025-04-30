import { COLOR } from '@/config/colors';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';
import { Button, Stack, Text, Title } from '@mantine/core';

export const LandingHero = () => {
  const { MD } = useMediaQuerys();
  return (
    <>
      <Stack justify="space-evenly" align="center" mih="90vh">
        <Title c={COLOR.GREEN} size={MD ? '10vw' : '15vw'}>
          HACKSPHERE
        </Title>
        <Stack align="center">
          <Text c={COLOR.PEACH} size={MD ? '4vw' : '7vw'}>
            Ideate. Code. Celebrate.
          </Text>
          <Text c={COLOR.PEACH} size={MD ? '2vw' : '4vw'} ta="center">
            Host or join hackathons that push the boundaries of creativity and
            code.
          </Text>
        </Stack>
        {/* <Stack>
          <Button size={MD ? 'xl' : 'md'}>Launch a Hackathon</Button>
          <Text ta="center">Watch Hackathons Live</Text>
        </Stack> */}
      </Stack>
    </>
  );
};
