import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import CategoryFormModal from '@/gameMaps/components/CategoryFormModal';

import MockedCategoryFormModal from '@/gameMaps/components/CategoryFormModal/mocks';

import usePlay from '@/gameMaps/hooks/usePlay';

import {
  mockedCategories,
  mockedCategory1,
  mockedItem2,
  mockedGame,
} from '@/gameMaps/types/mocks';

import PlayMapMenu from '../PlayMapMenu';

jest.mock('@/gameMaps/hooks/usePlay');
jest.mock('@/gameMaps/components/CategoryFormModal');

describe('PlayMapMenu', () => {
  const mockedCategoriesList = mockedCategories;
  const mockedChangeCategoryChoose = jest.fn();
  const mockedChoseAllCategories = jest.fn();
  const mockedClearAllChosenCategories = jest.fn();
  const mockedSetPointingCategoryId = jest.fn();
  const mockedPointingCategoryId = mockedCategory1.id;
  const mockedQuitFromCreatingNewItem = jest.fn();
  const mockedUpdateSubmittedCategory = jest.fn();
  const mockedSetIsCategoryEditOpen = jest.fn();
  const mockedOpenCategoryCreating = jest.fn();
  const mockedOpenCategoryUpdating = jest.fn();
  const mockedRelocatingItem = mockedItem2;
  const mockedRelocateItem = jest.fn();

  const mockedUsePlayResult = {
    categoriesList: mockedCategoriesList,
    changeCategoryChoose: mockedChangeCategoryChoose,
    choseAllCategories: mockedChoseAllCategories,
    clearAllChosenCategories: mockedClearAllChosenCategories,
    setPointingCategoryId: mockedSetPointingCategoryId,
    pointingCategoryId: mockedPointingCategoryId,
    quitFromCreatingNewItem: mockedQuitFromCreatingNewItem,
    game: mockedGame,
    updateSubmittedCategory: mockedUpdateSubmittedCategory,
    isCategoryEditOpen: false,
    setIsCategoryEditOpen: mockedSetIsCategoryEditOpen,
    editingCategory: null,
    openCategoryCreating: mockedOpenCategoryCreating,
    openCategoryUpdating: mockedOpenCategoryUpdating,
    relocatingItem: null,
    relocateItem: mockedRelocateItem,
  };

  const mockedUsePlay = jest.fn(() => mockedUsePlayResult);

  beforeEach(() => {
    (CategoryFormModal as unknown as jest.Mock).mockImplementation(
      MockedCategoryFormModal
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
    // Act
    const { baseElement } = renderWithTheme(<PlayMapMenu />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when pointingCategoryId is null', () => {
    test('renders successfully', () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      // Act
      const { baseElement } = renderWithTheme(<PlayMapMenu />);
      // Assert
      expect(baseElement).toMatchSnapshot();
    });

    describe('and when relocatingItem passed', () => {
      test('renders successfully', () => {
        // Arange
        const mockedUsePlay = jest.fn(() => ({
          ...mockedUsePlayResult,
          pointingCategoryId: null,
          relocatingItem: mockedRelocatingItem,
        }));
        (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
        // Act
        const { baseElement } = renderWithTheme(<PlayMapMenu />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });
  });

  describe('when isCategoryEditOpen true', () => {
    test('renders successfully', () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        isCategoryEditOpen: true,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      // Act
      const { baseElement } = renderWithTheme(<PlayMapMenu />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(MockedCategoryFormModal).toHaveBeenCalledWith(
        {
          isModalOpen: true,
          setIsModalOpen: expect.any(Function),
          data: null,
          onFinish: expect.any(Function),
          gameId: mockedGame.id,
        },
        {}
      );
    });

    describe('and editingCategory passed', () => {
      test('renders successfully', () => {
        // Arange
        const mockedUsePlay = jest.fn(() => ({
          ...mockedUsePlayResult,
          isCategoryEditOpen: true,
          editingCategory: mockedCategory1,
        }));
        (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
        // Act
        const { baseElement } = renderWithTheme(<PlayMapMenu />);
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(MockedCategoryFormModal).toHaveBeenCalledWith(
          {
            isModalOpen: true,
            setIsModalOpen: expect.any(Function),
            data: mockedCategory1,
            onFinish: expect.any(Function),
            gameId: mockedGame.id,
          },
          {}
        );
      });
    });
  });

  describe('when "Quit from creating new item" clicked', () => {
    test('calls quitFromCreatingNewItem', async () => {
      // Arange
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      const { getByText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getByText('Quit from creating new item'));
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).not.toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
    });
  });

  describe('when "Quit from relocating item" clicked', () => {
    test('calls relocateItem', async () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
        relocatingItem: mockedRelocatingItem,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      const { getByText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getByText('Quit from relocating item'));
      // Assert
      expect(mockedRelocateItem).toHaveBeenCalledWith(null);
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).not.toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
    });
  });

  describe('when "Clear all" clicked', () => {
    test('calls clearAllChosenCategories', async () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      const { getByText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getByText('Clear all'));
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).not.toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
    });
  });

  describe('when "Choose all" clicked', () => {
    test('calls choseAllCategories', async () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      const { getByText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getByText('Choose all'));
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).not.toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
    });
  });

  describe('when "Add category" clicked', () => {
    test('calls openCategoryCreating', async () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      const { getByText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getByText('Add category'));
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
    });
  });

  describe('when category title clicked ', () => {
    test('calls openCategoryUpdating', async () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      const { getAllByLabelText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getAllByLabelText('edit-category')[0]);
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).not.toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).toHaveBeenCalledWith(
        mockedCategory1.id
      );
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
    });
  });

  describe('when add item clicked', () => {
    test('calls setPointingCategoryId', async () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      const { getAllByLabelText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getAllByLabelText('add-category')[0]);
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).not.toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).toHaveBeenCalledWith(
        mockedCategories[0].id
      );
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
    });
  });

  describe('when item clicked', () => {
    test('calls changeCategoryChoose', async () => {
      // Arange
      const mockedUsePlay = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      const { getAllByLabelText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getAllByLabelText('category')[0]);
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).not.toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).toHaveBeenCalledWith(
        mockedCategories[0].id,
        true
      );
    });
  });
});
