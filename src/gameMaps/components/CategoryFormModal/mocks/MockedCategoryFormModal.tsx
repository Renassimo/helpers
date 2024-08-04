const MockedCategoryFormModal = jest.fn(({ isModalOpen, gameId }) => (
  <div>
    MockedCategoryFormModal {isModalOpen ? 'opened' : 'closed'} - {gameId}
  </div>
));

export default MockedCategoryFormModal;
