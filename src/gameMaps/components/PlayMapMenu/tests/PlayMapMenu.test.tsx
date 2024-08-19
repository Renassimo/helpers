import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import CategoryFormModal from '@/gameMaps/components/CategoryFormModal';
import FilterInput from '@/common/components/FilterInput';

import MockedCategoryFormModal from '@/gameMaps/components/CategoryFormModal/mocks';
import MockedFilterInput from '@/common/components/FilterInput/MockedFilterInput';

import usePlayContext from '@/gameMaps/contexts/hooks/usePlayContext';

import {
  mockedCategories,
  mockedCategory1,
  mockedItem2,
  mockedGame,
} from '@/gameMaps/types/mocks';

import PlayMapMenu from '../PlayMapMenu';

jest.mock('@/gameMaps/contexts/hooks/usePlayContext');
jest.mock('@/gameMaps/components/CategoryFormModal');
jest.mock('@/common/components/FilterInput');

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
  const mockedClearCategoryEditing = jest.fn();
  const mockedToggleFullyCollected = jest.fn();
  const mockedCategoryFilterQuery = 'Filter query';
  const mockedSetCategoryFilterQuery = jest.fn();

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
    clearCategoryEditing: mockedClearCategoryEditing,
    toggleFullyCollected: mockedToggleFullyCollected,
    categoryFilterQuery: mockedCategoryFilterQuery,
    setCategoryFilterQuery: mockedSetCategoryFilterQuery,
  };

  const mockedUsePlayContext = jest.fn(() => mockedUsePlayResult);

  beforeEach(() => {
    (CategoryFormModal as unknown as jest.Mock).mockImplementation(
      MockedCategoryFormModal
    );
    (FilterInput as unknown as jest.Mock).mockImplementation(MockedFilterInput);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders successfully', () => {
    // Arange
    (usePlayContext as unknown as jest.Mock).mockImplementation(
      mockedUsePlayContext
    );
    // Act
    const { baseElement } = renderWithTheme(<PlayMapMenu />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when pointingCategoryId is null', () => {
    test('renders successfully', () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
      // Act
      const { baseElement } = renderWithTheme(<PlayMapMenu />);
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(MockedFilterInput).toHaveBeenCalledWith(
        {
          value: mockedCategoryFilterQuery,
          setValue: mockedSetCategoryFilterQuery,
        },
        {}
      );
    });

    describe('and when relocatingItem passed', () => {
      test('renders successfully', () => {
        // Arange
        const mockedUsePlayContext = jest.fn(() => ({
          ...mockedUsePlayResult,
          pointingCategoryId: null,
          relocatingItem: mockedRelocatingItem,
        }));
        (usePlayContext as unknown as jest.Mock).mockImplementation(
          mockedUsePlayContext
        );
        // Act
        const { baseElement } = renderWithTheme(<PlayMapMenu />);
        // Assert
        expect(baseElement).toMatchSnapshot();
      });
    });

    describe('and when click toggle compact', () => {
      test('renders successfully', async () => {
        // Arange
        const mockedUsePlayContext = jest.fn(() => ({
          ...mockedUsePlayResult,
          pointingCategoryId: null,
        }));
        (usePlayContext as unknown as jest.Mock).mockImplementation(
          mockedUsePlayContext
        );
        const { baseElement, getByLabelText } = renderWithTheme(
          <PlayMapMenu />
        );
        // Act
        await userEvent.click(getByLabelText('Toggle compact list'));
        // Assert
        expect(baseElement).toMatchSnapshot();
        expect(MockedFilterInput).toHaveBeenCalledWith(
          {
            value: mockedCategoryFilterQuery,
            setValue: mockedSetCategoryFilterQuery,
          },
          {}
        );
      });
    });
  });

  describe('when isCategoryEditOpen true', () => {
    test('renders successfully', () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayResult,
        isCategoryEditOpen: true,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
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
          clearData: mockedClearCategoryEditing,
        },
        {}
      );
    });

    describe('and editingCategory passed', () => {
      test('renders successfully', () => {
        // Arange
        const mockedUsePlayContext = jest.fn(() => ({
          ...mockedUsePlayResult,
          isCategoryEditOpen: true,
          editingCategory: mockedCategory1,
        }));
        (usePlayContext as unknown as jest.Mock).mockImplementation(
          mockedUsePlayContext
        );
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
            clearData: mockedClearCategoryEditing,
          },
          {}
        );
      });
    });
  });

  describe('when "Quit from creating new item" clicked', () => {
    test('calls quitFromCreatingNewItem', async () => {
      // Arange
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
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
      expect(mockedToggleFullyCollected).not.toHaveBeenCalled();
    });
  });

  describe('when "Quit from relocating item" clicked', () => {
    test('calls relocateItem', async () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
        relocatingItem: mockedRelocatingItem,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
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
      expect(mockedToggleFullyCollected).not.toHaveBeenCalled();
    });
  });

  describe('when "Clear all" clicked', () => {
    test('calls clearAllChosenCategories', async () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
      const { getByLabelText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getByLabelText('Hide all'));
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).not.toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
      expect(mockedToggleFullyCollected).not.toHaveBeenCalled();
    });
  });

  describe('when "Choose all" clicked', () => {
    test('calls choseAllCategories', async () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
      const { getByLabelText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getByLabelText('Choose all'));
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).not.toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
      expect(mockedToggleFullyCollected).not.toHaveBeenCalled();
    });
  });

  describe('when "Add category" clicked', () => {
    test('calls openCategoryCreating', async () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
      const { getByLabelText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getByLabelText('Add category'));
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
      expect(mockedToggleFullyCollected).not.toHaveBeenCalled();
    });
  });

  describe('when "Hide / show fully collected" clicked', () => {
    test('calls openCategoryCreating', async () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
      const { getByLabelText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getByLabelText('Hide / show fully collected'));
      // Assert
      expect(mockedRelocateItem).not.toHaveBeenCalled();
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      expect(mockedOpenCategoryCreating).not.toHaveBeenCalled();
      expect(mockedOpenCategoryUpdating).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
      expect(mockedToggleFullyCollected).toHaveBeenCalled();
    });
  });

  describe('when category title clicked ', () => {
    test('calls openCategoryUpdating', async () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
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
      expect(mockedToggleFullyCollected).not.toHaveBeenCalled();
    });
  });

  describe('when add item clicked', () => {
    test('calls setPointingCategoryId', async () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
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
      expect(mockedToggleFullyCollected).not.toHaveBeenCalled();
    });
  });

  describe('when item clicked', () => {
    test('calls changeCategoryChoose', async () => {
      // Arange
      const mockedUsePlayContext = jest.fn(() => ({
        ...mockedUsePlayResult,
        pointingCategoryId: null,
      }));
      (usePlayContext as unknown as jest.Mock).mockImplementation(
        mockedUsePlayContext
      );
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
      expect(mockedToggleFullyCollected).not.toHaveBeenCalled();
    });
  });
});
