const MockedGameFormModal = jest.fn(({ isModalOpen }) => (
  <div>MockedGameFormModal {isModalOpen ? 'opened' : 'closed'}</div>
));

export default MockedGameFormModal;
