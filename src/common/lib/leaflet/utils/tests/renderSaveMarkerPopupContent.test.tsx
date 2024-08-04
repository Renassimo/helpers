import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import SaveMarkerPopupContent from '../../components/SaveMarkerPopupContent';
import MockedSaveMarkerPopupContent from '../../components/SaveMarkerPopupContent/mocks';

import renderSaveMarkerPopupContent from '../renderSaveMarkerPopupContent';

jest.mock('../../components/SaveMarkerPopupContent');

describe('renderSaveMarkerPopupContent', () => {
  test('renders successfully', () => {
    // Arange
    const mockedProps = {
      text: 'text',
      onAdd: jest.fn(),
      onCancel: jest.fn(),
    };
    (SaveMarkerPopupContent as unknown as jest.Mock).mockImplementationOnce(
      MockedSaveMarkerPopupContent
    );
    // Act
    const { baseElement } = renderWithTheme(
      <div>{renderSaveMarkerPopupContent(mockedProps)}</div>
    );
    // Assert
    expect(baseElement).toMatchSnapshot();
    expect(MockedSaveMarkerPopupContent).toHaveBeenCalledWith(mockedProps, {});
  });
});
