import { CommonHeader } from '@/component/header/common';
import { CommonLayout } from '@/component/layout/common';
import { LandingHero } from '@/component/pages/landing/hero';
import { HackathonCard } from '@/component/pages/landing/hero1.0';
import { LandingSectionTwo } from '@/component/pages/landing/section2';
import { LandingSectionFour } from '@/component/pages/landing/section4';
import { LandingSectionFive } from '@/component/pages/landing/section5';
import { LandingSectionSix } from '@/component/pages/landing/section6';
import { LandingSectionSeven } from '@/component/pages/landing/section7';
import { CenteredLoader } from '@/lib/center-loader';
import { CenteredMessage } from '@/lib/center-msg';
import { Center, Container, SimpleGrid } from '@mantine/core';
import { api } from '../../utils/api';
import { CommonFooter } from '@/component/footer/common';
import { LandingSectionEight } from '@/component/pages/landing/section8';
import { LandingSectionTen } from '@/component/pages/landing/section10';
import { LandingSectionEleven } from '@/component/pages/landing/section11';

export default function Home() {
  const ListApi = api.hackathon.list.useQuery(undefined, {
    onError: (error) => {
      console.error('API Error:', error);
    },
  });
  return (
    <CommonLayout footer={<CommonFooter />} header={<CommonHeader />}>
      <LandingHero />
      <Center>
        <SimpleGrid spacing="xs" cols={{ base: 1, md: 3 }}>
          {(() => {
            if (ListApi.isLoading) {
              return <CenteredLoader />;
            }

            if (ListApi.isError || (ListApi.isSuccess && !ListApi.data)) {
              return (
                <CenteredMessage
                  message="An error occurred while fetching hackathons"
                  title="Error"
                />
              );
            }

            if ((ListApi.data?.length ?? 0) < 1) {
              return (
                <>
                  <CenteredMessage
                    title="No hackathons found"
                    message="There are no hackathons to show"
                  />
                </>
              );
            }

            return ListApi.data?.map((hackathon) => (
              <>
                <Container>
                  <HackathonCard key={hackathon.id} hackathon={hackathon} />
                </Container>
              </>
            ));
          })()}
        </SimpleGrid>
      </Center>

      {/* <LandingSectionOne /> */}
      <LandingSectionTwo />
      {/* <LandingSectionThree /> */}
      <LandingSectionFour />
      <LandingSectionFive />
      <LandingSectionSix />
      <LandingSectionSeven />
      <LandingSectionEight />
      <LandingSectionTen />
      <LandingSectionEleven />
    </CommonLayout>
  );
}
