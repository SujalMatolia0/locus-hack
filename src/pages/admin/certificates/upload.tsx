import { CommonHeader } from '@/component/header/common';
import { CommonLayout } from '@/component/layout/common';
import { UploadCertificate } from '@/component/pages/certificates/upload';

export default function Upload() {
  return (
    <>
      <CommonLayout header={<CommonHeader />}>
        <UploadCertificate />
      </CommonLayout>
    </>
  );
}
