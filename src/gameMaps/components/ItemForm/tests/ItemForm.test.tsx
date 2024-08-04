import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { mockedItem } from '@/gameMaps/types/mocks';

import { ItemFormProps } from '@/gameMaps/types/props';

import ItemForm from '../ItemForm';

describe('ItemForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockedSetDescription = jest.fn();
  const mockedSetCollected = jest.fn();
  const mockedOnDelete = jest.fn();

  const mockedEmptyValues = {
    description: '',
    collected: false,
  };

  const mockedValues = {
    description: mockedItem.attributes.description,
    collected: mockedItem.attributes.collected,
  };

  const mockedSetters = {
    setDescription: mockedSetDescription,
    setCollected: mockedSetCollected,
  };

  const mockedErrors = {
    description: 'Description error',
    title: 'Title error',
    main: 'Main error',
  };

  const mockedEmptyErrors = {};

  const mockedProps: ItemFormProps = {
    values: mockedValues,
    setters: mockedSetters,
    errors: mockedEmptyErrors,
  };

  test('renders snapshot successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<ItemForm {...mockedProps} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when received errors', () => {
    test('renders snapshot successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <ItemForm {...mockedProps} errors={mockedErrors} />
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
        <ItemForm {...mockedProps} onDelete={mockedOnDelete} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when changes description', () => {
    test('calls setDescription', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <ItemForm
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
      expect(mockedSetCollected).not.toHaveBeenCalled();
    });
  });

  describe('when changes collected', () => {
    test('calls setCollected', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <ItemForm
          setters={mockedSetters}
          values={mockedEmptyValues}
          errors={mockedEmptyErrors}
        />
      );
      // Act
      await userEvent.click(getByLabelText('Collected'));
      // Assert
      expect(mockedSetCollected).toHaveBeenNthCalledWith(1, true);
      expect(mockedSetCollected).toHaveBeenCalledTimes(1);
      expect(mockedSetDescription).not.toHaveBeenCalled();
    });
  });

  describe('when clicks delete', () => {
    test('calls onDelete', async () => {
      // Arange
      const { getByText } = renderWithTheme(
        <ItemForm
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
