import { CommonHeader } from '@/component/header/common';
import { CommonLayout } from '@/component/layout/common';
import { CreateHackathon } from '@/component/pages/hackathon/create';

export default function Create() {
  return (
    <CommonLayout header={<CommonHeader />}>
      <CreateHackathon />
    </CommonLayout>
  );
}
