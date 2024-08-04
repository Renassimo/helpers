const MockedPlayFormModal = jest.fn(({ isModalOpen }) => (
  <div>MockedPlayFormModal {isModalOpen ? 'opened' : 'closed'}</div>
));

export default MockedPlayFormModal;
