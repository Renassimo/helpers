import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useGameForm from '@/gameMaps/hooks/useGameForm';

import Modal from '@/common/components/Modal';
import GameForm from '@/gameMaps/components/GameForm';

import MockedModal from '@/common/components/Modal/mocks';
import MockedGameForm from '@/gameMaps/components/GameForm/mocks';
import { mockedGame } from '@/gameMaps/types/mocks';

import GameFormModal from '../GameFormModal';

jest.mock('@/gameMaps/hooks/useGameForm');
jest.mock('@/common/components/Modal');
jest.mock('@/gameMaps/components/GameForm');

describe('GameFormModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (Modal as unknown as jest.Mock).mockImplementation(MockedModal);
    (GameForm as unknown as jest.Mock).mockImplementation(MockedGameForm);
  });

  const mockedData = mockedGame;

  const mockedValues = {
    title: 'mocked-title',
    description: 'mocked-description',
    backgroundColor: 'mocked-background-color',
    mapImageUrl: 'mocked-map-image-url',
  };
  const mockedSetters = 'mocked-setters';
  const mockedCleanForm = jest.fn();
  const mockedPrepareFormForEdit = jest.fn();
  const mockedOnSubmit = jest.fn();
  const mockedSetIsModalOpen = jest.fn();

  test('renders snapshot successfully', () => {
    // Arange
    const mockedUseGameForm = jest.fn(() => ({
      isEditForm: false,
      values: mockedValues,
      setters: mockedSetters,
      cleanForm: mockedCleanForm,
      prepareFormForEdit: mockedPrepareFormForEdit,
      onSubmit: mockedOnSubmit,
    }));
    (useGameForm as unknown as jest.Mock).mockImplementation(mockedUseGameForm);
    // Act
    const { baseElement } = renderWithTheme(
      <GameFormModal isModalOpen={true} setIsModalOpen={mockedSetIsModalOpen} />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(mockedUseGameForm).toBeCalledWith(undefined);
    expect(mockedPrepareFormForEdit).not.toBeCalled();
  });

  describe('when data passed', () => {
    test('calls prepareFormForEdit', () => {
      // Arange
      const mockedUseGameForm = jest.fn(() => ({
        isEditForm: true,
        values: mockedValues,
        setters: mockedSetters,
        cleanForm: mockedCleanForm,
        prepareFormForEdit: mockedPrepareFormForEdit,
        onSubmit: mockedOnSubmit,
      }));
      (useGameForm as unknown as jest.Mock).mockImplementation(
        mockedUseGameForm
      );
      // Act
      renderWithTheme(
        <GameFormModal
          isModalOpen={true}
          setIsModalOpen={mockedSetIsModalOpen}
          data={mockedData}
        />
      );
      // Assert
      expect(mockedUseGameForm).toBeCalledWith(mockedData);
      expect(mockedPrepareFormForEdit).toBeCalled();
    });
  });
});
