import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useCategoryForm from '@/gameMaps/hooks/useCategoryForm';

import Modal from '@/common/components/Modal';
import CategoryForm from '@/gameMaps/components/CategoryForm';

import MockedModal from '@/common/components/Modal/mocks';
import MockedCategoryForm from '@/gameMaps/components/CategoryForm/mocks';
import { mockedGame, mockedCategory } from '@/gameMaps/types/mocks';

import CategoryFormModal from '../CategoryFormModal';

jest.mock('@/gameMaps/hooks/useCategoryForm');
jest.mock('@/common/components/Modal');
jest.mock('@/gameMaps/components/CategoryForm');

describe('CategoryFormModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (Modal as unknown as jest.Mock).mockImplementation(MockedModal);
    (CategoryForm as unknown as jest.Mock).mockImplementation(
      MockedCategoryForm
    );
  });

  const mockedData = mockedCategory;
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
    const mockedUseCategoryForm = jest.fn(() => ({
      isEditForm: false,
      values: mockedValues,
      setters: mockedSetters,
      cleanForm: mockedCleanForm,
      prepareFormForEdit: mockedPrepareFormForEdit,
      onSubmit: mockedOnSubmit,
      errors: mockedErrors,
    }));
    (useCategoryForm as unknown as jest.Mock).mockImplementation(
      mockedUseCategoryForm
    );
    // Act
    const { baseElement } = renderWithTheme(
      <CategoryFormModal
        isModalOpen={true}
        setIsModalOpen={mockedSetIsModalOpen}
        onFinish={mockedOnFinish}
        gameId={mockedGameId}
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(mockedUseCategoryForm).toBeCalledWith(
      mockedGameId,
      undefined,
      expect.any(Function)
    );
    expect(mockedPrepareFormForEdit).not.toBeCalled();
    expect(MockedCategoryForm).toHaveBeenCalledWith(
      {
        values: mockedValues,
        setters: mockedSetters,
        errors: mockedErrors,
        isReady: true,
      },
      {}
    );
  });

  describe('when data passed', () => {
    test('renders snapshot successfully', async () => {
      // Arange
      const mockedUseCategoryForm = jest.fn(() => ({
        isEditForm: true,
        values: mockedValues,
        setters: mockedSetters,
        cleanForm: mockedCleanForm,
        prepareFormForEdit: mockedPrepareFormForEdit,
        onSubmit: mockedOnSubmit,
        errors: mockedErrors,
      }));
      (useCategoryForm as unknown as jest.Mock).mockImplementation(
        mockedUseCategoryForm
      );
      // Act
      const { baseElement } = await renderWithTheme(
        <CategoryFormModal
          isModalOpen={true}
          setIsModalOpen={mockedSetIsModalOpen}
          onFinish={mockedOnFinish}
          data={mockedData}
          gameId={mockedGameId}
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedUseCategoryForm).toBeCalledWith(
        mockedGameId,
        mockedData,
        expect.any(Function)
      );
      expect(mockedPrepareFormForEdit).toBeCalled();
      expect(MockedCategoryForm).toHaveBeenCalledWith(
        {
          values: mockedValues,
          setters: mockedSetters,
          errors: mockedErrors,
          onDelete: expect.any(Function),
          isReady: true,
        },
        {}
      );
    });

    test('calls prepareFormForEdit', () => {
      // Arange
      const mockedUseCategoryForm = jest.fn(() => ({
        isEditForm: true,
        values: mockedValues,
        setters: mockedSetters,
        cleanForm: mockedCleanForm,
        prepareFormForEdit: mockedPrepareFormForEdit,
        onSubmit: mockedOnSubmit,
        errors: mockedErrors,
      }));
      (useCategoryForm as unknown as jest.Mock).mockImplementation(
        mockedUseCategoryForm
      );
      // Act
      renderWithTheme(
        <CategoryFormModal
          isModalOpen={true}
          setIsModalOpen={mockedSetIsModalOpen}
          data={mockedData}
          onFinish={mockedOnFinish}
          gameId={mockedGameId}
        />
      );
      // Assert
      expect(mockedUseCategoryForm).toBeCalledWith(
        mockedGameId,
        mockedData,
        expect.any(Function)
      );
      expect(mockedPrepareFormForEdit).toBeCalled();
    });
  });
});
