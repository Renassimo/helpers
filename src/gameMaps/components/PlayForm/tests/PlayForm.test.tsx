import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { mockedPlay } from '@/gameMaps/types/mocks';

import { PlayFormProps } from '@/gameMaps/types/props';

import PlayForm from '../PlayForm';

describe('PlayForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockedSetTitle = jest.fn();
  const mockedSetDescription = jest.fn();
  const mockedOnDelete = jest.fn();

  const mockedEmptyValues = {
    title: '',
    description: '',
  };

  const mockedValues = {
    title: mockedPlay.attributes.title,
    description: mockedPlay.attributes.description,
  };

  const mockedSetters = {
    setTitle: mockedSetTitle,
    setDescription: mockedSetDescription,
  };

  const mockedErrors = {
    title: 'Title error',
    description: 'Description error',
    main: 'Main error',
  };

  const mockedEmptyErrors = {};

  const mockedProps: PlayFormProps = {
    values: mockedValues,
    setters: mockedSetters,
    errors: mockedEmptyErrors,
  };

  test('renders snapshot successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<PlayForm {...mockedProps} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
  });

  describe('when ready', () => {
    test('renders snapshot successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <PlayForm {...mockedProps} isReady />
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
        <PlayForm {...mockedProps} errors={mockedErrors} />
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
        <PlayForm {...mockedProps} onDelete={mockedOnDelete} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('when changes title', () => {
    test('calls setTitle', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <PlayForm
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
    });
  });

  describe('when changes description', () => {
    test('calls setDescription', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <PlayForm
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
    });
  });

  describe('when clicks delete', () => {
    test('calls onDelete', async () => {
      // Arange
      const { getByText } = renderWithTheme(
        <PlayForm
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
