import { CommonHeader } from '@/component/header/common';
import { CommonLayout } from '@/component/layout/common';
import {
  Button,
  Card,
  Container,
  Loader,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { api } from '../../../../utils/api';

export default function ManageHackathons() {
  const router = useRouter();
  const {
    data: hackathons,
    isLoading,
    refetch,
  } = api.hackathon.list.useQuery();
  const deleteHackathon = api.hackathon.delete.useMutation({
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Hackathon deleted!',
        color: 'green',
      });
      refetch();
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
  });

  if (isLoading) return <Loader />;

  return (
    <CommonLayout header={<CommonHeader />}>
      <Container mt={100}>
        <Card shadow="sm" padding="lg" withBorder mt="md">
          <Title order={3}>Manage Hackathons</Title>

          <Table striped highlightOnHover mt="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Start Date</Table.Th>
                <Table.Th>End Date</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {hackathons?.map((hackathon) => (
                <Table.Tr key={hackathon.id}>
                  <Table.Td>
                    <Text component={Link} href={`/hackathon/${hackathon.id}`}>
                      {hackathon.title}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    {new Date(hackathon.startDate).toLocaleDateString()}
                  </Table.Td>
                  <Table.Td>
                    {new Date(hackathon.endDate).toLocaleDateString()}
                  </Table.Td>
                  <Table.Td>
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() =>
                        router.push(`/admin/hackathon/update/${hackathon.id}`)
                      }
                    >
                      Update
                    </Button>
                    <Button
                      size="xs"
                      color="red"
                      ml="sm"
                      onClick={() =>
                        deleteHackathon.mutate({ id: hackathon.id })
                      }
                    >
                      Delete
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      </Container>
    </CommonLayout>
  );
}
