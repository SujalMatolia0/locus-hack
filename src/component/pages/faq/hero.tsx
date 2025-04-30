import { COLOR } from '@/config/colors';
import { SIZE_CONFIG } from '@/config/size_config';
import {
  Accordion,
  AspectRatio,
  Grid,
  Image,
  List,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { Children } from 'react';

const DATA = [
  {
    question: 'Who can participate?',
    answer:
      'Anyone with a passion for building — developers, designers, students, or professionals — are welcome!',
  },
  {
    question: 'Where do I start?',
    answer:
      'Sign up on HackSphere and join the dashboard. You’ll receive updates before each round begins.',
  },
  {
    question: 'Are there prizes?',
    answer:
      'Yes! Each round offers mini prizes and the final leaderboard decides grand winners.',
  },
  {
    question: 'Can I use open-source libraries?',
    answer:
      'Yes, as long as your final product is original and you credit any external tools or assets properly.',
  },
  {
    question: 'Is it a team or solo event?',
    answer:
      'Both! You can join as a solo hacker or as a team of up to 4 members.',
  },
  {
    question: 'What are the judging criteria?',
    answer:
      'Innovation, design, usability, and adherence to the theme are key judging parameters.',
  },
];

export const FAQHero = () => {
  return (
    <>
      <Stack>
        <Grid px={SIZE_CONFIG.PADDING_X} columns={12}>
          <Grid.Col span={8}>
            <Paper bg="transparent" withBorder>
              <Paper bg="transparent" p="xl">
                <Stack>
                  <Title c={COLOR.GREEN}>Official Rules</Title>
                  <AspectRatio ratio={16 / 9}>
                    <Image
                      src="https://img.freepik.com/free-photo/coding-concept-with-person-front-screen_23-2150062013.jpg"
                      alt="HackSphere Hackathon"
                    />
                  </AspectRatio>
                  <Stack gap="xl" pt="xl">
                    <Title c={COLOR.GREEN}>Overview</Title>
                    <Stack gap={1}>
                      <Text>
                        HackSphere is a dynamic, time-bound innovation sprint
                        that empowers creators, developers, and designers to
                        build impactful projects based on surprise themes and
                        challenges.
                      </Text>
                      <Text>
                        At the start of each round, participants will receive a
                        unique brief or challenge they must solve using their
                        skills and creativity. Expect a mix of coding, UI/UX,
                        and storytelling!
                      </Text>
                      <Text>
                        All submissions must be made through your HackSphere
                        dashboard and meet the round&apos;s specific criteria to
                        be eligible for points, recognition, or prizes.
                      </Text>
                      <List py="xl">
                        <List.Item>
                          Each round has a strict submission deadline.
                        </List.Item>
                        <List.Item>
                          You must participate in all rounds to qualify for
                          final prizes.
                        </List.Item>
                        <List.Item>
                          Only original work will be accepted – no plagiarism or
                          AI-only solutions.
                        </List.Item>
                      </List>
                    </Stack>
                    <Title c={COLOR.GREEN}>How to Compete</Title>
                    <Stack gap={1}>
                      <Text>
                        The competition consists of a total of 3 rounds spread
                        over 4 days. Individual daily submissions may qualify
                        for round-specific prizes but will not be eligible for
                        overall prizes unless a submission is made in all three
                        rounds.
                      </Text>
                      <List>
                        <List.Item>
                          <b>Round 1:</b> All participants will start from the
                          same base cloneable and shared assets released by the
                          organizing team. You’ll have 24 hours to submit
                          entries for Round 1.
                        </List.Item>
                        <List.Item>
                          <b>Round 2:</b> Clone another participant’s Round 1
                          project. You’ll receive a new segment of the story and
                          build on top of their project. 24 hours to submit.
                        </List.Item>
                        <List.Item>
                          <b>Round 3:</b> Similar to Round 2 — clone from the
                          list again, use new story prompts and submit your
                          final build.
                        </List.Item>
                      </List>
                      <Text>
                        ⚠️ <i>A word of warning:</i> Do not get ahead of the
                        scheduled builds. We’ll drop new story and design
                        prompts each day. Any off-schedule or early submissions
                        may be disqualified.
                      </Text>
                    </Stack>
                    <Title c={COLOR.GREEN}>Making an Official Submission</Title>
                    <Stack gap={1}>
                      <Text>
                        To submit, publish your day’s build to the Webflow
                        Showcase as a cloneable project and submit the link in
                        your HackSphere user dashboard.
                      </Text>
                      <List>
                        <List.Item>
                          Projects should be named:{' '}
                          <b>Day X | Participant First & Last Name</b>
                        </List.Item>
                        <List.Item>
                          Consider tagging your project with “HackSphere” to
                          improve discoverability.
                        </List.Item>
                        <List.Item>
                          Submit screenshots with your site so judges can
                          identify your entry easily.
                        </List.Item>
                      </List>
                      <Text>
                        Make sure your project is cloneable and shared publicly.
                        Invalid or incomplete links will not be judged.
                      </Text>
                      <Text>
                        For rounds 2 and 3, your submission must include the
                        Webflow username and link of the project you cloned
                        from. Incorrect linking can impact your score.
                      </Text>
                    </Stack>
                    <Title c={COLOR.GREEN}>Daily Prizes</Title>
                    <Stack gap={1}>
                      <Text>To qualify for daily prizes, you must:</Text>
                      <List>
                        <List.Item>
                          Publish your site publicly in the Webflow showcase.
                        </List.Item>
                        <List.Item>
                          Submit the link in the HackSphere dashboard before
                          12:00 PM (event time).
                        </List.Item>
                        <List.Item>
                          Ensure the required footer element is included in the
                          project.
                        </List.Item>
                      </List>
                      <Text>
                        <b>Pro Tip:</b> Make your showcase entry public before
                        submitting inside HackSphere. Add proper title and tags
                        to make it easier for the judges to locate your work.
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Paper>
          </Grid.Col>
          <Grid.Col span="auto">
            <Paper bg="transparent" p="xl" withBorder>
              <Stack>
                <Title c={COLOR.GREEN}>FAQs</Title>
                <Accordion bg="transparent" chevron={<IconPlus />}>
                  {Children.toArray(
                    DATA.map((data) => (
                      <>
                        <Accordion.Item
                          style={{
                            border: 'none',
                          }}
                          key={data.question}
                          value={data.answer}
                        >
                          <Accordion.Control c={COLOR.GREEN}>
                            {data.question}
                          </Accordion.Control>
                          <Accordion.Panel c={COLOR.PEACH}>
                            {data.answer}
                          </Accordion.Panel>
                        </Accordion.Item>
                        <Image src="/divider.png" alt="divider" />
                      </>
                    ))
                  )}
                </Accordion>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
};
