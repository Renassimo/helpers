const MockedGroupPostInfoAlert = jest.fn(
  ({
    selectedCount,
    onOpenModal,
    clearSelectedIds,
  }: {
    selectedCount: number;
    onOpenModal: () => void;
    clearSelectedIds: () => void;
  }) => (
    <div>
      MockedGroupPostInfoAlert: selectedCount: {selectedCount}; onOpenModal:{' '}
      {!!onOpenModal ? 'passed' : 'not passed'}; clearSelectedIds:{' '}
      {!!clearSelectedIds ? 'passed' : 'not passed'};
    </div>
  )
);

export default MockedGroupPostInfoAlert;
