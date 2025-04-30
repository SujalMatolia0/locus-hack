import { Button, Card, List, Loader, Text, Title } from '@mantine/core';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../../../utils/api';

export const Submissions = ({ isAdmin }: { isAdmin: boolean }) => {
  const router = useRouter();
  const { hackathonId } = router.query;
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: submissions, isLoading } = api.submission.list.useQuery({
    hackathonId: hackathonId as string,
  });

  // Fetch certificates
  const { data: certificates } = api.certificate.list.useQuery({
    hackathonId: hackathonId as string,
  });

  // Function to download JSON file
  const downloadJSON = () => {
    if (!submissions) return;
    const jsonData = submissions.map(({ userId }) => ({
      hackathonId,
      userId,
      certUrl: '',
    }));
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `submissions_${hackathonId}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (isLoading) return <Loader />;
  if (!submissions || submissions.length === 0)
    return <Text>No submissions yet.</Text>;

  return (
    <Card shadow="sm" padding="lg" withBorder mt="md">
      <Title order={3}>Submissions</Title>
      {isAdmin && (
        <>
          <Button onClick={downloadJSON} mt="md" color="blue">
            Download Submissions JSON
          </Button>
        </>
      )}
      <List mt="sm">
        {submissions
          .filter((submission) => isAdmin || submission.userId === userId)
          .map((submission) => {
            const cert = certificates?.find(
              (c) => c.userId === submission.userId
            );

            return (
              <List.Item key={submission.id}>
                <Text>
                  {submission.user.name} -{submission.code}
                </Text>
                {cert && (
                  <Button
                    component="a"
                    href={cert.certUrl}
                    download
                    color="teal"
                    size="xs"
                    mt="xs"
                  >
                    Download Certificate
                  </Button>
                )}
              </List.Item>
            );
          })}
      </List>
    </Card>
  );
};
