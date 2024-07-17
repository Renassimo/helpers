import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import usePlayForm from '@/gameMaps/hooks/usePlayForm';

import Modal from '@/common/components/Modal';
import PlayForm from '@/gameMaps/components/PlayForm';

import MockedModal from '@/common/components/Modal/mocks';
import MockedPlayForm from '@/gameMaps/components/PlayForm/mocks';
import { mockedGame, mockedPlay } from '@/gameMaps/types/mocks';

import PlayFormModal from '../PlayFormModal';

jest.mock('@/gameMaps/hooks/usePlayForm');
jest.mock('@/common/components/Modal');
jest.mock('@/gameMaps/components/PlayForm');

describe('PlayFormModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (Modal as unknown as jest.Mock).mockImplementation(MockedModal);
    (PlayForm as unknown as jest.Mock).mockImplementation(MockedPlayForm);
  });

  const mockedData = mockedPlay;
  const mockedGameId = mockedGame.id;

  const mockedValues = {
    title: 'mocked-title',
    description: 'mocked-description',
  };
  const mockedSetters = 'mocked-setters';
  const mockedCleanForm = jest.fn();
  const mockedPrepareFormForEdit = jest.fn();
  const mockedOnSubmit = jest.fn();
  const mockedSetIsModalOpen = jest.fn();
  const mockedErrors = 'mockedErrors';
  const mockedOnFinish = jest.fn();

  test('renders snapshot successfully', () => {
    // Arange
    const mockedUsePlayForm = jest.fn(() => ({
      isEditForm: false,
      values: mockedValues,
      setters: mockedSetters,
      cleanForm: mockedCleanForm,
      prepareFormForEdit: mockedPrepareFormForEdit,
      onSubmit: mockedOnSubmit,
      errors: mockedErrors,
    }));
    (usePlayForm as unknown as jest.Mock).mockImplementation(mockedUsePlayForm);
    // Act
    const { baseElement } = renderWithTheme(
      <PlayFormModal
        isModalOpen={true}
        setIsModalOpen={mockedSetIsModalOpen}
        onFinish={mockedOnFinish}
        gameId={mockedGameId}
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(mockedUsePlayForm).toBeCalledWith(
      mockedGameId,
      undefined,
      expect.any(Function)
    );
    expect(mockedPrepareFormForEdit).not.toBeCalled();
    expect(MockedPlayForm).toHaveBeenCalledWith(
      { values: mockedValues, setters: mockedSetters, errors: mockedErrors },
      {}
    );
  });

  describe('when data passed', () => {
    test('renders snapshot successfully', async () => {
      // Arange
      const mockedUsePlayForm = jest.fn(() => ({
        isEditForm: true,
        values: mockedValues,
        setters: mockedSetters,
        cleanForm: mockedCleanForm,
        prepareFormForEdit: mockedPrepareFormForEdit,
        onSubmit: mockedOnSubmit,
        errors: mockedErrors,
      }));
      (usePlayForm as unknown as jest.Mock).mockImplementation(
        mockedUsePlayForm
      );
      // Act
      const { baseElement } = await renderWithTheme(
        <PlayFormModal
          isModalOpen={true}
          setIsModalOpen={mockedSetIsModalOpen}
          onFinish={mockedOnFinish}
          data={mockedData}
          gameId={mockedGameId}
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedUsePlayForm).toBeCalledWith(
        mockedGameId,
        mockedData,
        expect.any(Function)
      );
      expect(mockedPrepareFormForEdit).toBeCalled();
      expect(MockedPlayForm).toHaveBeenCalledWith(
        {
          values: mockedValues,
          setters: mockedSetters,
          errors: mockedErrors,
          onDelete: expect.any(Function),
        },
        {}
      );
    });

    test('calls prepareFormForEdit', () => {
      // Arange
      const mockedUsePlayForm = jest.fn(() => ({
        isEditForm: true,
        values: mockedValues,
        setters: mockedSetters,
        cleanForm: mockedCleanForm,
        prepareFormForEdit: mockedPrepareFormForEdit,
        onSubmit: mockedOnSubmit,
        errors: mockedErrors,
      }));
      (usePlayForm as unknown as jest.Mock).mockImplementation(
        mockedUsePlayForm
      );
      // Act
      renderWithTheme(
        <PlayFormModal
          isModalOpen={true}
          setIsModalOpen={mockedSetIsModalOpen}
          data={mockedData}
          onFinish={mockedOnFinish}
          gameId={mockedGameId}
        />
      );
      // Assert
      expect(mockedUsePlayForm).toBeCalledWith(
        mockedGameId,
        mockedData,
        expect.any(Function)
      );
      expect(mockedPrepareFormForEdit).toBeCalled();
    });
  });
});
