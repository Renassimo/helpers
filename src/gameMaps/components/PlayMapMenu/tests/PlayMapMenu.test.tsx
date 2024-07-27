import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import usePlay from '@/gameMaps/hooks/usePlay';

import { mockedCategories, mockedCategory1 } from '@/gameMaps/types/mocks';

import PlayMapMenu from '../PlayMapMenu';

jest.mock('@/gameMaps/hooks/usePlay');

describe('PlayMapMenu', () => {
  const mockedCategoriesList = mockedCategories;
  const mockedChangeCategoryChoose = jest.fn();
  const mockedChoseAllCategories = jest.fn();
  const mockedClearAllChosenCategories = jest.fn();
  const mockedSetPointingCategoryId = jest.fn();
  const mockedPointingCategoryId = mockedCategory1.id;
  const mockedQuitFromCreatingNewItem = jest.fn();

  const mockedUsePlayResult = {
    categoriesList: mockedCategoriesList,
    changeCategoryChoose: mockedChangeCategoryChoose,
    choseAllCategories: mockedChoseAllCategories,
    clearAllChosenCategories: mockedClearAllChosenCategories,
    setPointingCategoryId: mockedSetPointingCategoryId,
    pointingCategoryId: mockedPointingCategoryId,
    quitFromCreatingNewItem: mockedQuitFromCreatingNewItem,
  };

  const mockedUsePlay = jest.fn(() => mockedUsePlayResult);

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
  });

  describe('when "Quit from creating new item" clicked', () => {
    test('calls quitFromCreatingNewItem', async () => {
      // Arange
      (usePlay as unknown as jest.Mock).mockImplementation(mockedUsePlay);
      const { getByText } = renderWithTheme(<PlayMapMenu />);
      // Act
      await userEvent.click(getByText('Quit from creating new item'));
      // Assert
      expect(mockedQuitFromCreatingNewItem).toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      // expect(...).not.toHaveBeenCalled();
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
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      // expect(...).not.toHaveBeenCalled();
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
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).toHaveBeenCalled();
      // expect(...).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).not.toHaveBeenCalled();
    });
  });

  describe.skip('when "Add category" clicked', () => {
    test('calls ...', async () => {
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
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      // expect(...).toHaveBeenCalled();
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
      await userEvent.click(getAllByLabelText('add-item')[0]);
      // Assert
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      // expect(...).not.toHaveBeenCalled();
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
      expect(mockedQuitFromCreatingNewItem).not.toHaveBeenCalled();
      expect(mockedClearAllChosenCategories).not.toHaveBeenCalled();
      expect(mockedChoseAllCategories).not.toHaveBeenCalled();
      // expect(...).not.toHaveBeenCalled();
      expect(mockedSetPointingCategoryId).not.toHaveBeenCalled();
      expect(mockedChangeCategoryChoose).toHaveBeenCalledWith(
        mockedCategories[0].id,
        true
      );
    });
  });
});
