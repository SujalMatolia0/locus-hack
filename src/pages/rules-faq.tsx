import { CommonFooter } from '@/component/footer/common';
import { CommonHeader } from '@/component/header/common';
import { CommonLayout } from '@/component/layout/common';
import { FAQHero } from '@/component/pages/faq/hero';

export default function RulesAndFAQ() {
  return (
    <CommonLayout footer={<CommonFooter />} header={<CommonHeader />}>
      <FAQHero />
    </CommonLayout>
  );
}
