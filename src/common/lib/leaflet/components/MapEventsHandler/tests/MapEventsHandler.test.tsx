import renderWithTheme from '@/common/tests/helpers/renderWithTheme';

import { useMapEvents } from 'react-leaflet';

import MapEventsHandler from '../MapEventsHandler';

jest.mock('react-leaflet');

describe('MapEventsHandler', () => {
  test('returns null and renders useMapEvents hook', () => {
    // Arange
    const mockedHandleMapClick = jest.fn();
    const mockedUseMapEvents = jest.fn();
    (useMapEvents as unknown as jest.Mock).mockImplementation(
      mockedUseMapEvents
    );
    // Act
    const { baseElement } = renderWithTheme(
      <MapEventsHandler handleMapClick={mockedHandleMapClick} />
    );
    // Assert
    expect(baseElement).toMatchInlineSnapshot(`
      <body>
        <div />
      </body>
    `);
    expect(mockedUseMapEvents).toHaveBeenCalledWith({
      click: mockedHandleMapClick,
    });
  });
});
