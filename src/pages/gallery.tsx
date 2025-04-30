import { CommonFooter } from '@/component/footer/common';
import { CommonHeader } from '@/component/header/common';
import { CommonLayout } from '@/component/layout/common';
import { GalleryHero } from '@/component/pages/gallery/hero';

export default function Gallery() {
  return (
    <CommonLayout footer={<CommonFooter />} header={<CommonHeader />}>
      <GalleryHero />
    </CommonLayout>
  );
}
