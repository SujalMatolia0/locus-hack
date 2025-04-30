import { COLOR } from '@/config/colors';
import { SIZE_CONFIG } from '@/config/size_config';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';
import {
  Accordion,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

import { Children } from 'react';

const DATA = [
  {
    title: 'Rules',
    FAQ: [
      {
        question: ' Rules Question1',
        answer: ' Rules Answer1',
      },
      {
        question: ' Rules Question2',
        answer: ' Rules Answer2',
      },
      {
        question: ' Rules Question3',
        answer: ' Rules Answer3',
      },
    ],
  },
  {
    title: "FAQ's",
    FAQ: [
      {
        question: ' FAQ Question1',
        answer: ' FAQ Answer1',
      },
      {
        question: ' FAQ Question2',
        answer: ' FAQ Answer2',
      },
      {
        question: ' FAQ Question3',
        answer: ' FAQ Answer3',
      },
    ],
  },
];

export const LandingSectionSix = () => {
  const { MD } = useMediaQuerys();
  return (
    <>
      <SimpleGrid
        px={MD ? SIZE_CONFIG.PADDING_X : 'md'}
        cols={{ base: 1, md: 2 }}
      >
        {Children.toArray(
          DATA.map((data) => (
            <>
              <Paper p="xl" bg="transparent">
                <Stack pt="xl">
                  <Group justify="space-between">
                    <Title c={COLOR.GREEN}>{data.title}</Title>
                    <IconArrowRight />
                  </Group>

                  <Stack py="xl">
                    <Accordion>
                      {data.FAQ.map((faq) => (
                        <>
                          <Accordion.Item key={faq.question} value={faq.answer}>
                            <Accordion.Control c={COLOR.GREEN}>
                              {faq.question}
                            </Accordion.Control>

                            <Accordion.Panel c={COLOR.PEACH}>
                              {faq.answer}
                            </Accordion.Panel>
                          </Accordion.Item>
                        </>
                      ))}
                    </Accordion>
                  </Stack>
                </Stack>
              </Paper>
            </>
          ))
        )}
      </SimpleGrid>
    </>
  );
};
