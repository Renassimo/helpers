import MotivationPollProvider from '@/motivationPoll/providers/MotivationPollProvider';

import usePdfDownload from '@/common/hooks/usePdfDownload';

import { MotivationPollApiData } from '@/motivationPoll/types';

import PageTemplate from '@/common/templates/PageTemplate';
import MotivationPoll from '@/motivationPoll/components/MotivationPoll';
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
