import { COLOR } from '@/config/colors';
import { useMediaQuerys } from '@/lib/hooks/use-media-querys';
import {
  Box,
  Button,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconChevronRight, IconChevronUp } from '@tabler/icons-react';
import { useState } from 'react';

export const LandingSectionFour = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const scheduleData = [
    {
      date: 'July 20, 2021',
      events: [
        {
          time: '10:00 AM ET',
          title: 'Participant Check–In',
          desc: 'At 10:00 am on July 20, registered participants can start checking in and exploring the competition venue. Volunteers will be on site for final Q&A and last minute registration assistance.',
        },
        {
          time: '11:00 AM ET',
          title: 'Launch Countdown Begins',
          desc: 'An hour before the kickoff stream we will open the competition venue to the public and start our countdown clock. The space will remain open to participants as well as the public throughout the entire competition.',
        },
        {
          time: '12:00 PM ET',
          title: 'Kickoff Live Stream',
          desc: "At noon we'll kick off the event. Vlad Magdalin (CEO Webflow) will join us for a kickoff livestream that will recap the rules and lay out the first segment of the unified story line.\n\nAt this time we will also release the master cloneable with shared assets for day 1. We will be taking questions from the crowd, and reviewing advice from last year’s grand champion.",
        },
        {
          time: '1:00 PM ET',
          title: 'Start Public Build Sessions',
          desc: 'Participants will get started right away by finding a workspace inside our virtual world or in private. Either way you’ll have 24 hours to plot and produce your project.\n\nDuring this time we will facilitate impromptu breakout sessions for brainstorming while we provide play-by-play coverage of the early moments of the competition.',
        },
        {
          time: '6:00 PM ET',
          title: 'Day 1 Live Recap',
          desc: 'We’ll close out day one with a live walk through of the virtual venue. We’ll chat with early builders to get their thoughts about the first day of competition and ask them how they think they stack up against the competition. Throughout the event we will have live touch points like this to keep the audience connected to participant progress.',
        },
        {
          time: '8:00 PM – 10:00 AM ET',
          title: 'Scramble Mode Begins',
          desc: 'Overnight is often when the magic happens. As more participants from around the world join the competition and the space comes to life with creative juices and all night work vibes. Drop in at any time to explore the progress or network with participants.',
        },
      ],
    },
    {
      date: 'July 21, 2021',
      events: [
        {
          time: '10:00 AM ET',
          title: 'Day 2 Kickoff',
          desc: 'We kick off the second day of the competition with an exciting live stream. Get ready to dive into the next phase!',
        },
      ],
    },
    {
      date: 'July 22, 2021',
      events: [
        {
          time: '10:00 AM ET',
          title: 'Day 3 Starts',
          desc: 'Day 3 is packed with intensive workshops and one-on-one mentoring sessions. Make sure to check out the schedule!',
        },
      ],
    },
    {
      date: 'July 23, 2021',
      events: [
        {
          time: '10:00 AM ET',
          title: 'Day 4 Starts',
          desc: 'The final day is here. Participants will have their last chance to make changes to their projects before submission.',
        },
      ],
    },
  ];

  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4'];

  const data = scheduleData[selectedDay];
  const eventsToShow = showAll ? data.events : data.events.slice(0, 3);

  const { MD } = useMediaQuerys();

  return (
    <Box py="xl">
      <Container size="lg">
        <Title c={COLOR.GREEN} order={1} ta="center" mb="xs" fw={900}>
          Schedule of Events
        </Title>

        {MD ? (
          <Group
            style={{ position: 'relative', left: '35%', top: 60, zIndex: 1 }}
            align="center"
            mb="xl"
            wrap="wrap"
          >
            {days.map((day, index) => {
              if (scheduleData[index]?.events.length > 0) {
                return (
                  <Button
                    key={day}
                    onClick={() => {
                      setSelectedDay(index);
                      setShowAll(false);
                    }}
                    variant={selectedDay === index ? 'filled' : 'outline'}
                    c={selectedDay === index ? COLOR.GREEN : COLOR.GREEN}
                    radius="xs"
                    size="md"
                    styles={{
                      root: {
                        fontWeight: 700,
                        backgroundColor:
                          selectedDay === index
                            ? COLOR.TURQUOISE
                            : 'transparent',
                        border: `2px solid ${COLOR.GREEN}`,
                      },
                    }}
                  >
                    {day.toUpperCase()}
                  </Button>
                );
              }
              return null;
            })}
          </Group>
        ) : (
          <SimpleGrid cols={2}>
            {days.map((day, index) => {
              if (scheduleData[index]?.events.length > 0) {
                return (
                  <Button
                    key={day}
                    onClick={() => {
                      setSelectedDay(index);
                      setShowAll(false);
                    }}
                    variant={selectedDay === index ? 'filled' : 'outline'}
                    c={selectedDay === index ? COLOR.GREEN : COLOR.GREEN}
                    radius="xs"
                    size="md"
                    styles={{
                      root: {
                        fontWeight: 700,
                        backgroundColor:
                          selectedDay === index
                            ? COLOR.TURQUOISE
                            : 'transparent',
                        border: `2px solid ${COLOR.GREEN}`,
                      },
                    }}
                  >
                    {day.toUpperCase()}
                  </Button>
                );
              }
              return null;
            })}
          </SimpleGrid>
        )}

        <Box
          bg="rgba(255,255,255,0.1)"
          p="lg"
          style={{
            backdropFilter: 'blur(6px)',
            position: 'relative',
            zIndex: 0,
          }}
        >
          <Title order={3} c={COLOR.GREEN} fw={900} mb="md">
            {data.date}
          </Title>

          <Stack
            pl="sm"
            style={{ borderLeft: '2px dashed white', position: 'relative' }}
          >
            {eventsToShow.map((event, idx) => (
              <Box key={idx} pl="md" style={{ position: 'relative' }}>
                <Box
                  style={{
                    width: 14,
                    height: 14,
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    position: 'absolute',
                    left: -20,
                    top: 8,
                  }}
                />
                <Text fw={700} size="lg" c={COLOR.PEACH}>
                  {event.time} – {event.title.toUpperCase()}
                </Text>
                <Text fw="bold">{event.desc}</Text>
              </Box>
            ))}
          </Stack>

          {data.events.length > 3 && (
            <Text
              mt="lg"
              fw={800}
              size="lg"
              onClick={() => setShowAll(!showAll)}
              style={{
                border: '2px white solid',
                padding: '10px 0',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              {showAll ? 'SHOW LESS' : 'CLICK TO EXPAND'}{' '}
              {showAll ? (
                <IconChevronUp style={{ display: 'inline' }} />
              ) : (
                <IconChevronRight style={{ display: 'inline' }} />
              )}
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  );
};
