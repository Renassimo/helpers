import userEvent from '@testing-library/user-event';
import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import ImagePicker from '@/common/components/ImagePicker';
import ColorPicker from '@/common/components/ColorPicker';

import MockedImagePicker from '@/common/components/ImagePicker/mocks';
import MockedColorPicker from '@/common/components/ColorPicker/mocks';
import { mockedGame } from '@/gameMaps/types/mocks';

import { GameFormProps } from '@/gameMaps/types/props';

import GameForm from '../GameForm';

jest.mock('@/common/components/ImagePicker');
jest.mock('@/common/components/ColorPicker');

describe('GameForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (ImagePicker as unknown as jest.Mock).mockImplementationOnce(
      MockedImagePicker
    );
    (ColorPicker as unknown as jest.Mock).mockImplementationOnce(
      MockedColorPicker
    );
  });

  const mockedSetTitle = jest.fn();
  const mockedSetDescription = jest.fn();
  const mockedSetBackgroundColor = jest.fn();
  const mockedSetMapImage = jest.fn();
  const mockedOnDelete = jest.fn();

  const mockedEmptyValues = {
    title: '',
    description: '',
    backgroundColor: '',
    mapImageUrl: '',
    mapImage: null,
  };

  const mockedValues = {
    title: mockedGame.attributes.title,
    description: mockedGame.attributes.description,
    backgroundColor: mockedGame.attributes.backgroundColor,
    mapImageUrl: mockedGame.attributes.mapImageUrl,
    mapImage: null,
  };

  const mockedSetters = {
    setTitle: mockedSetTitle,
    setDescription: mockedSetDescription,
    setBackgroundColor: mockedSetBackgroundColor,
    setMapImage: mockedSetMapImage,
  };

  const mockedErrors = {
    title: 'Title error',
    description: 'Description error',
    backgroundColor: 'BackgroundColor error',
    main: 'Main error',
  };

  const mockedEmptyErrors = {};

  const mockedProps: GameFormProps = {
    values: mockedValues,
    setters: mockedSetters,
    errors: mockedEmptyErrors,
  };

  test('renders snapshot successfully', () => {
    // Arange
    // Act
    const { baseElement } = renderWithTheme(<GameForm {...mockedProps} />);
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(MockedColorPicker).toHaveBeenCalledWith(
      {
        name: 'backgroundColor',
        label: 'Map background color',
        value: mockedValues.backgroundColor,
        onChange: expect.any(Function),
      },
      {}
    );
    expect(MockedImagePicker).toHaveBeenCalledWith(
      {
        defaultUrlValue: mockedValues.mapImageUrl,
        onChange: expect.any(Function),
      },
      {}
    );
  });

  describe('when received errors', () => {
    test('renders snapshot successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <GameForm {...mockedProps} errors={mockedErrors} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(MockedColorPicker).toHaveBeenCalledWith(
        {
          name: 'backgroundColor',
          label: 'Map background color',
          value: mockedValues.backgroundColor,
          onChange: expect.any(Function),
          error: mockedErrors.backgroundColor,
        },
        {}
      );
      expect(MockedImagePicker).toHaveBeenCalledWith(
        {
          defaultUrlValue: mockedValues.mapImageUrl,
          onChange: expect.any(Function),
        },
        {}
      );
    });
  });

  describe('when receives optional props', () => {
    test('renders snapshot successfully', () => {
      // Arange
      // Act
      const { baseElement } = renderWithTheme(
        <GameForm {...mockedProps} onDelete={mockedOnDelete} />
      );
      // Assert
      expect(baseElement).toMatchSnapshot();
      expect(MockedColorPicker).toHaveBeenCalledWith(
        {
          name: 'backgroundColor',
          label: 'Map background color',
          value: mockedValues.backgroundColor,
          onChange: expect.any(Function),
        },
        {}
      );
      expect(MockedImagePicker).toHaveBeenCalledWith(
        {
          defaultUrlValue: mockedValues.mapImageUrl,
          onChange: expect.any(Function),
        },
        {}
      );
    });
  });

  describe('when changes title', () => {
    test('calls setTitle', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <GameForm
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
      expect(mockedSetBackgroundColor).not.toHaveBeenCalled();
      expect(mockedSetMapImage).not.toHaveBeenCalled();
    });
  });

  describe('when changes description', () => {
    test('calls setDescription', async () => {
      // Arange
      const { getByLabelText } = renderWithTheme(
        <GameForm
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
      expect(mockedSetBackgroundColor).not.toHaveBeenCalled();
      expect(mockedSetMapImage).not.toHaveBeenCalled();
    });
  });

  describe('when clicks delete', () => {
    test('calls onDelete', async () => {
      // Arange
      const { getByText } = renderWithTheme(
        <GameForm
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
