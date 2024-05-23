const MockedResults = jest.fn(
  ({ onDownloadPdf }: { onDownloadPdf: () => void }) => (
    <div>Mocked Results, onDownloadPdf: {!!onDownloadPdf}</div>
  )
);

export default MockedResults;
