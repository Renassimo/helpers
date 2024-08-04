const MockedItemFormModal = jest.fn(
  ({ isModalOpen, gameId, coordinates, playId, categoryId }) => (
    <div>
      MockedItemFormModal {isModalOpen ? 'opened' : 'closed'} - {gameId} -{' '}
      {coordinates?.[0]} - {coordinates?.[1]} - {playId} - {categoryId}
    </div>
  )
);

export default MockedItemFormModal;
