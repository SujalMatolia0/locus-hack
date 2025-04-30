'use client';

import { Card, Text, Badge, Button, Group, Stack, Title } from '@mantine/core';
import Link from 'next/link';

interface HackathonCardProps {
  hackathon: {
    id: string;
    title: string;
    description: string;
    startDate: string | Date;
    endDate: string | Date;
    createdBy: string;
  };
}

export const HackathonCard = ({ hackathon }: HackathonCardProps) => {
  const startDate = new Date(hackathon.startDate).toLocaleDateString();
  const endDate = new Date(hackathon.endDate).toLocaleDateString();

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        width: 300,
        height: 300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Stack>
        <Stack justify="space-between">
          <Title order={4} fw={600}>
            {hackathon.title}
          </Title>
          <Stack gap={1}>
            <Group>
              <Text size="sm">Start</Text>
              <Badge color="blue" variant="light">
                {startDate}
              </Badge>
            </Group>
            <Group>
              <Text size="sm">End</Text>
              <Badge color="blue" variant="light">
                {endDate}
              </Badge>
            </Group>
          </Stack>
        </Stack>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {hackathon.description}
        </Text>
      </Stack>

      <Link href={`/hackathon/${hackathon.id}`} passHref legacyBehavior>
        <Button color="indigo" fullWidth mt="md" radius="md" component="a">
          View Details
        </Button>
      </Link>
    </Card>
  );
};
