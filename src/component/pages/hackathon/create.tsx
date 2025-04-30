import {
  Button,
  Container,
  Group,
  Paper,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { api } from '../../../../utils/api';

export const CreateHackathon = () => {
  const { data: session } = useSession();
  const [hackathonId, setHackathonId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<
    { id: string; title: string; description: string }[]
  >([]);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
  });

  // ✅ Create Hackathon Mutation with Error Handling
  const createHackathonMutation = api.hackathon.create.useMutation({
    onSuccess: (data) => {
      setHackathonId(data.id);
      showNotification({
        title: 'Success',
        message: 'Hackathon created successfully!',
        color: 'green',
      });
    },
    onError: (error) => {
      showNotification({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });

  // ✅ Create Question Mutation with Error Handling
  const createQuestionMutation = api.question.create.useMutation({
    onSuccess: (data) => {
      setQuestions((prev) => [...prev, data]);
      setNewQuestion({ title: '', description: '' });

      showNotification({
        title: 'Success',
        message: 'Question added successfully!',
        color: 'green',
      });
    },
    onError: (error) => {
      showNotification({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      startDate: null as Date | null,
      endDate: null as Date | null,
    },
  });

  const handleHackathonSubmit = (values: typeof form.values) => {
    if (!values.startDate || !values.endDate) return;

    if (!session?.user.name) {
      showNotification({
        title: 'Error',
        message: 'User is not authenticated.',
        color: 'red',
      });
      return;
    }

    createHackathonMutation.mutate({
      title: values.name,
      description: values.description,
      startDate: values.startDate.toISOString(),
      endDate: values.endDate.toISOString(),
      createdBy: session?.user.name,
    });
  };

  const addQuestion = () => {
    if (!hackathonId) return;

    createQuestionMutation.mutate({
      hackathonId,
      title: newQuestion.title,
      description: newQuestion.description,
    });
  };

  return (
    <Container>
      {/* Create Hackathon Form */}
      <Paper
        shadow="xs"
        p="lg"
        withBorder
        mt="150"
        style={{ maxWidth: 500, margin: 'auto' }}
      >
        <Title order={2} ta="center" mb="md">
          Create Hackathon
        </Title>

        <form onSubmit={form.onSubmit(handleHackathonSubmit)}>
          <TextInput
            label="Hackathon Name"
            {...form.getInputProps('name')}
            required
            mb="sm"
          />
          <Textarea
            label="Description"
            {...form.getInputProps('description')}
            required
            mb="sm"
          />
          <DateInput
            label="Start Date"
            {...form.getInputProps('startDate')}
            required
            mb="sm"
          />
          <DateInput
            label="End Date"
            {...form.getInputProps('endDate')}
            required
            mb="sm"
          />

          <Group align="right" mt="md">
            <Button type="submit" loading={createHackathonMutation.isLoading}>
              Create Hackathon
            </Button>
          </Group>
        </form>
      </Paper>

      {/* Add Questions (Only visible after hackathon is created) */}
      {hackathonId && (
        <Paper
          shadow="xs"
          p="lg"
          withBorder
          mt="50"
          style={{ maxWidth: 500, margin: 'auto' }}
        >
          <Title order={3} ta="center" mb="md">
            Add Questions
          </Title>

          <TextInput
            label="Question Title"
            value={newQuestion.title}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, title: e.target.value })
            }
            mb="sm"
          />
          <Textarea
            label="Description"
            value={newQuestion.description}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, description: e.target.value })
            }
            mb="sm"
          />

          <Group>
            <Button
              onClick={addQuestion}
              loading={createQuestionMutation.isLoading}
              disabled={!newQuestion.title || !newQuestion.description}
            >
              Add Question
            </Button>
          </Group>

          {/* Show added questions */}
          {questions.length > 0 && (
            <>
              <Title order={4} mt="md">
                Questions List
              </Title>
              {questions.map((q) => (
                <Paper key={q.id} shadow="xs" p="md" withBorder mt="sm">
                  <Title order={5}>{q.title}</Title>
                  <p>{q.description}</p>
                </Paper>
              ))}
            </>
          )}
        </Paper>
      )}
    </Container>
  );
};
