import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import ColorPicker from '@/common/components/ColorPicker';

import MockedColorPicker from '@/common/components/ColorPicker/mocks';
import { mockedCategory } from '@/gameMaps/types/mocks';

import { CategoryFormProps } from '@/gameMaps/types/props';

import CategoryForm from '../CategoryForm';

jest.mock('@/common/components/ColorPicker');

describe('CategoryForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockedSetTitle = jest.fn();
  const mockedSetDescription = jest.fn();
  const mockedSetColor = jest.fn();
  const mockedSetItemsAmount = jest.fn();
  const mockedOnDelete = jest.fn();

  const mockedEmptyValues = {
    title: '',
    description: '',
    color: '',
    itemsAmount: 0,
  };

  const mockedValues = {
    title: mockedCategory.attributes.title,
    description: mockedCategory.attributes.description,
    color: mockedCategory.attributes.color,
    itemsAmount: mockedCategory.attributes.itemsAmount,
  };

  const mockedSetters = {
    setTitle: mockedSetTitle,
    setDescription: mockedSetDescription,
    setColor: mockedSetColor,
    setItemsAmount: mockedSetItemsAmount,
  };

  const mockedErrors = {
    title: 'Title error',
    description: 'Description error',
    color: 'Color error',
    itemsAmount: 'Items Amount error',
    main: 'Main error',
  };

  const mockedEmptyErrors = {};

  const mockedProps: CategoryFormProps = {
    values: mockedValues,
    setters: mockedSetters,
    errors: mockedEmptyErrors,
  };

  beforeEach(() => {
    (ColorPicker as unknown as jest.Mock).mockImplementationOnce(
      MockedColorPicker
    );
  });

  test('renders snapshot successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<CategoryForm {...mockedProps} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when ready', () => {
    test('renders snapshot successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <CategoryForm {...mockedProps} isReady />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when received errors', () => {
    test('renders snapshot successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <CategoryForm {...mockedProps} errors={mockedErrors} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when receives optional props', () => {
    test('renders snapshot successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <CategoryForm {...mockedProps} onDelete={mockedOnDelete} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when changes title', () => {
    test('calls setTitle', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <CategoryForm
          setters={mockedSetters}
          values={mockedEmptyValues}
          errors={mockedEmptyErrors}
        />
      );
      // Act
      await userEvent.type(getByLabelText('Title'), 'Ti');
      // Assert
      expect(mockedSetTitle).toHaveBeenNthCalledWith(1, 'T');
      expect(mockedSetTitle).toHaveBeenNthCalledWith(2, 'i');
      expect(mockedSetTitle).toHaveBeenCalledTimes(2);
      expect(mockedSetDescription).not.toHaveBeenCalled();
      expect(mockedSetItemsAmount).not.toHaveBeenCalled();
    });
  });

  describe('when changes description', () => {
    test('calls setDescription', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <CategoryForm
          setters={mockedSetters}
          values={mockedEmptyValues}
          errors={mockedEmptyErrors}
        />
      );
      // Act
      await userEvent.type(getByLabelText('Description'), 'De');
      // Assert
      expect(mockedSetDescription).toHaveBeenNthCalledWith(1, 'D');
      expect(mockedSetDescription).toHaveBeenNthCalledWith(2, 'e');
      expect(mockedSetDescription).toHaveBeenCalledTimes(2);
      expect(mockedSetTitle).not.toHaveBeenCalled();
      expect(mockedSetItemsAmount).not.toHaveBeenCalled();
    });
  });

  describe('when changes items amount', () => {
    test('calls setItemsAmount', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <CategoryForm
          setters={mockedSetters}
          values={mockedEmptyValues}
          errors={mockedEmptyErrors}
        />
      );
      // Act
      await userEvent.type(getByLabelText('Items Amount'), '5');
      // Assert
      expect(mockedSetItemsAmount).toHaveBeenNthCalledWith(1, 5);
      expect(mockedSetItemsAmount).toHaveBeenCalledTimes(1);
      expect(mockedSetTitle).not.toHaveBeenCalled();
      expect(mockedSetDescription).not.toHaveBeenCalled();
    });
  });

  describe('when clicks delete', () => {
    test('calls onDelete', async () => {
      // Arange
      const { getByText } = renderWithTheme(
        <CategoryForm
          setters={mockedSetters}
          values={mockedEmptyValues}
          errors={mockedEmptyErrors}
          onDelete={mockedOnDelete}
        />
      );
      // Act
      await userEvent.click(getByText('Delete'));
      // Assert
      expect(mockedOnDelete).toBeCalled();
    });
  });
});
