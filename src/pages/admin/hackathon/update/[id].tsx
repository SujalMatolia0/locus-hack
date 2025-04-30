import type { ParsedUrlQuery } from 'querystring';
import { CommonHeader } from '@/component/header/common';
import { CommonLayout } from '@/component/layout/common';
import { prisma } from '@/server/db';
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Group,
  Modal,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import type { GetServerSideProps } from 'next';
import { useState } from 'react';
import { api } from '../../../../../utils/api';

interface Hackathon {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  questions: Question[];
}

interface Question {
  id: string;
  title: string;
  description: string;
}

interface UpdateHackathonProps {
  hackathon: Hackathon;
}

export default function UpdateHackathon({ hackathon }: UpdateHackathonProps) {
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(hackathon.questions);
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
  });

  const form = useForm({
    initialValues: {
      title: hackathon.title,
      startDate: hackathon.startDate.split('T')[0],
      endDate: hackathon.endDate.split('T')[0],
    },
  });

  const updateHackathon = api.hackathon.update.useMutation({
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Hackathon updated successfully!',
        color: 'green',
      });
      window.location.href = '/admin/hackathon/manage';
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });

  const deleteHackathon = api.hackathon.delete.useMutation({
    onSuccess: () => {
      notifications.show({
        title: 'Deleted',
        message: 'Hackathon deleted successfully!',
        color: 'red',
      });
      window.location.href = '/admin/hackathon/manage';
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });

  const addQuestionMutation = api.question.create.useMutation({
    onSuccess: (question) => {
      setQuestions([...questions, question]);
      setNewQuestion({ title: '', description: '' });
      notifications.show({
        title: 'Success',
        message: 'Question added successfully!',
        color: 'green',
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });

  const removeQuestionMutation = api.question.delete.useMutation({
    onSuccess: (_, variables) => {
      setQuestions(questions.filter((q) => q.id !== variables.id));
      notifications.show({
        title: 'Success',
        message: 'Question removed successfully!',
        color: 'green',
      });
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });

  const handleSubmit = async (values: {
    title: string;
    startDate: string;
    endDate: string;
  }) => {
    setLoading(true);
    updateHackathon.mutate({
      id: hackathon.id,
      title: values.title,
      startDate: new Date(values.startDate).toISOString(),
      endDate: new Date(values.endDate).toISOString(),
    });
  };

  const handleAddQuestion = () => {
    if (newQuestion.title.trim() && newQuestion.description.trim()) {
      addQuestionMutation.mutate({
        title: newQuestion.title,
        description: newQuestion.description,
        hackathonId: hackathon.id,
      });
    }
  };

  const handleRemoveQuestion = (id: string) => {
    removeQuestionMutation.mutate({ id });
  };

  const handleDeleteHackathon = () => {
    deleteHackathon.mutate({ id: hackathon.id });
  };

  return (
    <CommonLayout header={<CommonHeader />}>
      <Container mt={100}>
        <Card shadow="sm" padding="lg" withBorder>
          <Title order={3}>Update Hackathon</Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Hackathon Name"
              {...form.getInputProps('title')}
              required
            />
            <TextInput
              type="date"
              label="Start Date"
              {...form.getInputProps('startDate')}
              required
            />
            <TextInput
              type="date"
              label="End Date"
              {...form.getInputProps('endDate')}
              required
            />

            <Title order={4} mt="md">
              Manage Questions
            </Title>

            {questions.map((question) => (
              <Group key={question.id} mt="sm">
                <TextInput value={question.title} readOnly />
                <ActionIcon
                  color="red"
                  onClick={() => handleRemoveQuestion(question.id)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ))}

            <TextInput
              mt="md"
              label="New Question Title"
              value={newQuestion.title}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, title: e.target.value })
              }
            />
            <Textarea
              label="New Question Description"
              value={newQuestion.description}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, description: e.target.value })
              }
            />
            <Button mt="sm" onClick={handleAddQuestion}>
              Add Question
            </Button>

            <Group mt="md">
              <Button type="submit" loading={loading}>
                Update Hackathon
              </Button>

              <Button color="red" onClick={() => setDeleteModalOpen(true)}>
                Delete Hackathon
              </Button>
            </Group>
          </form>
        </Card>
      </Container>

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <p>
          Are you sure you want to delete this hackathon? This action is
          irreversible.
        </p>
        <Group mt="md">
          <Button color="gray" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteHackathon}>
            Delete
          </Button>
        </Group>
      </Modal>
    </CommonLayout>
  );
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<
  UpdateHackathonProps
> = async (context) => {
  const { id } = context.params as Params;

  const hackathon = await prisma.hackathon.findUnique({
    where: { id },
    include: {
      questions: {
        select: { id: true, title: true, description: true },
      },
    },
  });

  if (!hackathon) {
    return { notFound: true };
  }

  return {
    props: {
      hackathon: {
        id: hackathon.id,
        title: hackathon.title,
        startDate: hackathon.startDate.toISOString(),
        endDate: hackathon.endDate.toISOString(),
        questions: hackathon.questions,
      },
    },
  };
};
