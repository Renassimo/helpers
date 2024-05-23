import MotivationPollProvider from '@/providers/motivationPoll/MotivationPollProvider';

import usePdfDownload from '@/hooks/common/usePdfDownload';

import { MotivationPollApiData } from '@/types/motivationPoll';

import PageTemplate from '@/components/templates/PageTemplate';
import MotivationPoll from '@/components/motivationPoll/MotivationPoll';
import LocaleLinks from '@/common/components/LocaleLinks';

const MotivationPollPage = ({
  data,
  locales,
  locale,
}: {
  data: MotivationPollApiData;
  locales: string[];
  locale: string;
}) => {
  const { pdfRef, onDownloadPdf } = usePdfDownload('motivation-poll-results');
  return (
    <MotivationPollProvider data={data}>
      <div ref={pdfRef}>
        <PageTemplate title="Motivation Test" pages={[]}>
          <MotivationPoll onDownloadPdf={onDownloadPdf} />
          <LocaleLinks
            locale={locale}
            locales={locales}
            href="/motivationTest"
          />
        </PageTemplate>
      </div>
    </MotivationPollProvider>
  );
};

export default MotivationPollPage;
