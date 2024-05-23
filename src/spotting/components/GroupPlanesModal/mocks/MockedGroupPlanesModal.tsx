import { Dispatch, SetStateAction } from 'react';

const MockedGroupPlanesModal = jest.fn(
  ({
    isModalOpen,
    setIsModalOpen,
  }: {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  }) => (
    <div>
      MockedGroupPlanesModal. isModalOpen: {isModalOpen ? 'open' : 'closed'};
      setIsModalOpen: {!!setIsModalOpen ? 'passed' : 'not passed'}
    </div>
  )
);

export default MockedGroupPlanesModal;
