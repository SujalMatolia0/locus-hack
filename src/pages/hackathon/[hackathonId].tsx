import { CommonHeader } from '@/component/header/common';
import { CommonLayout } from '@/component/layout/common';
import { HackathonDetails } from '@/component/pages/hackathon/show';
import { CenteredLoader } from '@/lib/center-loader';
import { CenteredMessage } from '@/lib/center-msg';
import { Container } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import type { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { api } from '../../../utils/api';

const isValidId = (id: string) => /^[a-z0-9]+$/i.test(id);

export default function Hackathon({ hackathonId }: { hackathonId: string }) {
  const { data: session } = useSession();
  const validId = isValidId(hackathonId);

  const {
    data: hackathon,
    isLoading,
    error,
  } = api.hackathon.get.useQuery({ id: hackathonId }, { enabled: validId });

  // Show error notification if there's an error
  useEffect(() => {
    if (error) {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
        autoClose: 5000,
      });
    }
  }, [error]);

  return (
    <CommonLayout header={<CommonHeader />}>
      {!validId && (
        <CenteredMessage
          title="Invalid ID"
          message="The provided hackathon ID is not valid."
        />
      )}

      {isLoading && validId && <CenteredLoader />}

      {!isLoading && validId && !hackathon && (
        <CenteredMessage title="Not Found" message="Hackathon not found." />
      )}

      {!isLoading && hackathon && hackathon.questions.length === 0 && (
        <CenteredMessage
          title="No Questions"
          message="No questions available for this hackathon."
        />
      )}

      {hackathon && (
        <Container mt={200}>
          <HackathonDetails
            hackathon={{
              ...hackathon,
              startDate: hackathon.startDate.toISOString(),
              endDate: hackathon.endDate.toISOString(),
            }}
            questions={hackathon.questions}
            isAdmin={session?.user.role === 'ADMIN'}
          />
        </Container>
      )}
    </CommonLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const hackathonId = params?.hackathonId;

  if (
    !hackathonId ||
    typeof hackathonId !== 'string' ||
    !isValidId(hackathonId)
  ) {
    return {
      notFound: true,
    };
  }

  return {
    props: { hackathonId },
  };
};
