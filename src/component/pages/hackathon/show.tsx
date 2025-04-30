import {
  Button,
  Stack,
  Text,
  Title,
  Paper,
  Card,
  Group,
  Divider,
  SimpleGrid,
  Textarea,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { differenceInDays, format, isAfter, isBefore } from 'date-fns';
import { useSession } from 'next-auth/react';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '../../../../utils/api';
// import { Submissions } from './submission';

interface HackathonProps {
  hackathon: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  };
  questions: { id: string; title: string; description: string }[];
  isAdmin: boolean;
}

export const HackathonDetails = ({
  hackathon,
  questions,
  isAdmin,
}: HackathonProps) => {
  const { data: session } = useSession();
  const [selectedCode, setSelectedCode] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<string>>(
    new Set()
  );

  const startDate = new Date(hackathon.startDate);
  const endDate = new Date(hackathon.endDate);
  const today = new Date();

  const daysUntilStart = differenceInDays(startDate, today);
  const hasStarted = isBefore(startDate, today) || daysUntilStart === 0;
  const hasEnded = isAfter(today, endDate);
  const isActive = hasStarted && !hasEnded;

  const { data: submissions } = api.submission.list.useQuery(
    { hackathonId: hackathon.id },
    { enabled: !!session?.user.id }
  );

  const { data: certificate } = api.certificate.get.useQuery(
    { id: hackathon.id },
    { enabled: !!session?.user.id }
  );

  useEffect(() => {
    if (submissions) {
      const submittedSet = new Set(
        submissions
          .filter((sub) => sub.userId === session?.user.id)
          .map((sub) => sub.questionId)
      );
      setSubmittedQuestions(submittedSet);
    }
  }, [submissions, session?.user.id]);

  const createSubmission = api.submission.create.useMutation({
    onSuccess: (data) => {
      notifications.show({
        title: 'Success',
        message: 'Code submitted successfully!',
        color: 'green',
      });
      setSubmittedQuestions((prev) => new Set(prev).add(data.questionId));
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });

  const handleCodeChange = (questionId: string, code: string) => {
    setSelectedCode((prev) => ({ ...prev, [questionId]: code }));
  };

  const handleUpload = (questionId: string) => {
    const code = selectedCode[questionId];
    if (!code?.trim()) {
      notifications.show({
        title: 'Error',
        message: 'Please enter your code before submitting.',
        color: 'red',
      });
      return;
    }

    if (!session?.user.id) return notFound;

    createSubmission.mutate({
      userId: session.user.id,
      hackathonId: hackathon.id,
      questionId,
      code,
    });
  };

  return (
    <Stack mt="lg">
      <Card bg="transparent" radius="md" p="lg" shadow="none">
        <Stack align="center">
          <Title order={2} ta="center" tt="capitalize" fw={700} c="white">
            {hackathon.title}
          </Title>
          <Text c="dimmed">{hackathon.description}</Text>

          <Group mt="sm" gap="lg">
            <Text c="gray">Start: {format(startDate, 'MMMM d, yyyy')}</Text>
            <Text c="gray">End: {format(endDate, 'MMMM d, yyyy')}</Text>
          </Group>

          {hasStarted && !hasEnded && (
            <Text c="blue" mt="sm">
              Hackathon is ongoing.
              {daysUntilStart > 0 && ` Starts in ${daysUntilStart} days.`}
            </Text>
          )}

          {hasEnded && (
            <>
              <Text c="red" mt="sm">
                This hackathon has ended.
              </Text>
              {certificate?.certUrl ? (
                <Button
                  component="a"
                  href={certificate.certUrl}
                  target="_blank"
                  mt="sm"
                  color="green"
                  variant="outline"
                >
                  Download Certificate
                </Button>
              ) : (
                <Text mt="sm" size="sm" c="dimmed">
                  Your certificate will be available in 2–3 business days.
                </Text>
              )}
            </>
          )}
        </Stack>
      </Card>

      {isActive && (
        <Paper p="xl" radius="md" bg="transparent">
          <Group mb="md">
            <Title order={3} maw={200} c="white">
              Questions:
            </Title>
            <Text maw={700} c="white">
              Paste your tested, concise, and well-formatted code in the text
              area below, then submit it for review. Only the shortest valid
              solutions will be considered.
            </Text>
          </Group>

          {questions.length > 0 ? (
            <SimpleGrid cols={2} spacing="lg">
              {questions.map((q) => (
                <Card
                  key={q.id}
                  withBorder
                  p="md"
                  radius="md"
                  shadow="xs"
                  bg="transparent"
                >
                  <Title order={4} c="white">
                    {q.title}
                  </Title>
                  <Text c="dimmed" size="sm" mt="xs">
                    {q.description}
                  </Text>

                  <Textarea
                    mt="md"
                    placeholder={
                      submittedQuestions.has(q.id)
                        ? 'You already submitted'
                        : 'Paste your solution code here...'
                    }
                    minRows={6}
                    value={selectedCode[q.id] || ''}
                    onChange={(e) =>
                      handleCodeChange(q.id, e.currentTarget.value)
                    }
                    disabled={submittedQuestions.has(q.id)}
                    styles={{
                      input: {
                        backgroundColor: 'transparent',
                        borderColor: '#ccc',
                        color: 'white',
                      },
                    }}
                  />

                  <Button
                    mt="sm"
                    onClick={() => handleUpload(q.id)}
                    loading={createSubmission.isLoading}
                    disabled={submittedQuestions.has(q.id)}
                    variant="outline"
                    color="white"
                  >
                    {submittedQuestions.has(q.id)
                      ? 'Already Submitted'
                      : 'Submit'}
                  </Button>
                </Card>
              ))}
            </SimpleGrid>
          ) : (
            <Text mt="sm" c="dimmed">
              No questions available for this hackathon.
            </Text>
          )}
        </Paper>
      )}

      {isAdmin && (
        <>
          <Divider mt="xl" color="white" />
          <Title order={3} c="white" mb="md">
            Submissions
          </Title>
          {/* <Submissions isAdmin={isAdmin} /> */}
          <SimpleGrid cols={2} spacing="lg" mt="xl">
            {submissions?.map((submission) => {
              const question = questions.find(
                (q) => q.id === submission.questionId
              );

              return (
                <Card
                  key={submission.id}
                  bg="transparent"
                  shadow="xs"
                  p="md"
                  withBorder
                >
                  {question ? (
                    <Title order={4} c="white">
                      {question.title}
                    </Title>
                  ) : (
                    <Text c="white">Question ID: {submission.questionId}</Text>
                  )}
                  <Text c="dimmed" mt="sm">
                    Code:- {submission.code}
                  </Text>
                  <Text size="sm" mt="md" c="dimmed">
                    Submitted on{' '}
                    {format(new Date(submission.createdAt), 'MMMM d, yyyy')}
                  </Text>
                </Card>
              );
            })}
          </SimpleGrid>
        </>
      )}
    </Stack>
  );
};
