import MotivationPollProvider from '@/providers/motivationPoll/MotivationPollProvider';

import usePdfDownload from '@/hooks/common/usePdfDownload';

import { MotivationPollApiData } from '@/types/motivationPoll';

import PageTemplate from '@/components/templates/PageTemplate';
import MotivationPoll from '@/components/motivationPoll/MotivationPoll';

const MotivationPollPage = ({ data }: { data: MotivationPollApiData }) => {
  const { pdfRef, onDownloadPdf } = usePdfDownload('motivation-poll-results');
  return (
    <MotivationPollProvider data={data}>
      <div ref={pdfRef}>
        <PageTemplate title="Motivation Test" pages={[]}>
          <MotivationPoll onDownloadPdf={onDownloadPdf} />
        </PageTemplate>
      </div>
    </MotivationPollProvider>
  );
};

export default MotivationPollPage;
