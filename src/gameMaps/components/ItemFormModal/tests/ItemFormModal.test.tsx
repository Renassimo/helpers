import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import useItemForm from '@/gameMaps/hooks/useItemForm';

import Modal from '@/common/components/Modal';
import ItemForm from '@/gameMaps/components/ItemForm';

import MockedModal from '@/common/components/Modal/mocks';
import MockedItemForm from '@/gameMaps/components/ItemForm/mocks';
import { mockedGame, mockedItem } from '@/gameMaps/types/mocks';

import ItemFormModal from '../ItemFormModal';

jest.mock('@/gameMaps/hooks/useItemForm');
jest.mock('@/common/components/Modal');
jest.mock('@/gameMaps/components/ItemForm');

describe('ItemFormModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (Modal as unknown as jest.Mock).mockImplementation(MockedModal);
    (ItemForm as unknown as jest.Mock).mockImplementation(MockedItemForm);
  });

  const mockedData = mockedItem;
  const mockedGameId = mockedGame.id;
  const mockedPlayId = mockedData.attributes.playId;
  const mockedCategoryId = mockedData.attributes.categoryId;
  const mockedCoordinates = mockedData.attributes.coordinates;

  const mockedValues = {
    description: 'mocked-description',
    collected: false,
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
    const mockedUseItemForm = jest.fn(() => ({
      isEditForm: false,
      values: mockedValues,
      setters: mockedSetters,
      cleanForm: mockedCleanForm,
      prepareFormForEdit: mockedPrepareFormForEdit,
      onSubmit: mockedOnSubmit,
      errors: mockedErrors,
    }));
    (useItemForm as unknown as jest.Mock).mockImplementation(mockedUseItemForm);
    // Act
    const { baseElement } = renderWithTheme(
      <ItemFormModal
        isModalOpen={true}
        setIsModalOpen={mockedSetIsModalOpen}
        onFinish={mockedOnFinish}
        gameId={mockedGameId}
        playId={mockedPlayId}
        categoryId={mockedCategoryId}
        coordinates={mockedCoordinates}
      />
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(mockedUseItemForm).toBeCalledWith(
      {
        gameId: mockedGameId,
        playId: mockedPlayId,
        categoryId: mockedCategoryId,
        coordinates: mockedCoordinates,
      },
      undefined,
      expect.any(Function)
    );
    expect(mockedPrepareFormForEdit).not.toBeCalled();
    expect(MockedItemForm).toHaveBeenCalledWith(
      { values: mockedValues, setters: mockedSetters, errors: mockedErrors },
      {}
    );
  });

  describe('when data passed', () => {
    test('renders snapshot successfully', async () => {
      // Arange
      const mockedUseItemForm = jest.fn(() => ({
        isEditForm: true,
        values: mockedValues,
        setters: mockedSetters,
        cleanForm: mockedCleanForm,
        prepareFormForEdit: mockedPrepareFormForEdit,
        onSubmit: mockedOnSubmit,
        errors: mockedErrors,
      }));
      (useItemForm as unknown as jest.Mock).mockImplementation(
        mockedUseItemForm
      );
      // Act
      const { baseElement } = await renderWithTheme(
        <ItemFormModal
          isModalOpen={true}
          setIsModalOpen={mockedSetIsModalOpen}
          onFinish={mockedOnFinish}
          data={mockedData}
          gameId={mockedGameId}
          playId={mockedPlayId}
          categoryId={mockedCategoryId}
          coordinates={mockedCoordinates}
        />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(mockedUseItemForm).toBeCalledWith(
        {
          gameId: mockedGameId,
          playId: mockedPlayId,
          categoryId: mockedCategoryId,
          coordinates: mockedCoordinates,
        },
        mockedData,
        expect.any(Function)
      );
      expect(mockedPrepareFormForEdit).toBeCalled();
      expect(MockedItemForm).toHaveBeenCalledWith(
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
      const mockedUseItemForm = jest.fn(() => ({
        isEditForm: true,
        values: mockedValues,
        setters: mockedSetters,
        cleanForm: mockedCleanForm,
        prepareFormForEdit: mockedPrepareFormForEdit,
        onSubmit: mockedOnSubmit,
        errors: mockedErrors,
      }));
      (useItemForm as unknown as jest.Mock).mockImplementation(
        mockedUseItemForm
      );
      // Act
      renderWithTheme(
        <ItemFormModal
          isModalOpen={true}
          setIsModalOpen={mockedSetIsModalOpen}
          data={mockedData}
          onFinish={mockedOnFinish}
          gameId={mockedGameId}
          playId={mockedPlayId}
          categoryId={mockedCategoryId}
          coordinates={mockedCoordinates}
        />
      );
      // Assert
      expect(mockedUseItemForm).toBeCalledWith(
        {
          gameId: mockedGameId,
          playId: mockedPlayId,
          categoryId: mockedCategoryId,
          coordinates: mockedCoordinates,
        },
        mockedData,
        expect.any(Function)
      );
      expect(mockedPrepareFormForEdit).toBeCalled();
    });
  });
});
